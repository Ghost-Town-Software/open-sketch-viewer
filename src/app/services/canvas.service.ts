import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import Konva from 'konva';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {LayerService} from './layer.service';
import {Stage} from 'konva/types/Stage';
import {Artboard} from '../sketch/models/artboard.model';
import {Layer} from 'konva/types/Layer';

const SCALE_FACTOR = 1.1;

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private htmlRenderer: Renderer2;
  private stage: Stage;
  private artboard: Artboard;

  private spacePressed: boolean;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(rendererFactory: RendererFactory2, private layerService: LayerService) {
    this.htmlRenderer = rendererFactory.createRenderer(null, null);
  }

  public findLayer(layerId: string) {
    return this.artboard.layers.find(layer => layer.do_objectID === layerId);
  }

  public createArtboard(container: Element, artboard: Artboard) {
    this.artboard = artboard;
    this.stage = new Konva.Stage({
      container: container as any,
      width: (container.parentNode as Element).clientWidth,
      height: (container.parentNode as Element).clientHeight,
    });

    const {width, height} = artboard.frame;

    const contentLayer = this.createContentLayer(width, height);
    this.stage.add(this.createBackgroundLayer(width, height));
    this.stage.add(contentLayer);

    this.bindWheel();
    this.bindKeyboard();
    this.bindMouse();
    this.bindResize();

    this.layerService.bindEvents(this.stage);

    return this.stage;
  }

  public render() {
    const layer: Layer = this.stage.findOne('#content');

    for (const model of this.artboard.layers) {
      try {
        if(model) {
          const shape = model.render();
          if(shape) {
            layer.add(shape);
          }
        }
      } catch(e) {
        console.error('Error affected by', model);
        console.error(e);
        throw e;
      }
    }

    this.clipArtboard();
    this.center();

    this.stage.batchDraw();
  }

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stage.destroy();
    this.stage = null;
  }

  public zoomIn() {
    return this.zoom(1);
  }

  public zoomOut() {
    return this.zoom(-1);
  }

  public fit() {
    const layer = this.stage.findOne('#content');
    const currentZoom = this.getCurrentZoom();
    const scaleValue = currentZoom * .95;

    layer.scale({
      x: scaleValue,
      y: scaleValue
    });

    this.center();

    return Math.floor(currentZoom * 100);
  }

  public getCurrentZoom() {
    const artboard: Layer = this.stage.findOne('#artboard');
    const box = artboard.getClientRect({relativeTo: this.stage});
    const stageSize = this.stage.getSize();
    const scaleX = stageSize.width / box.width;
    const scaleY = stageSize.height / box.height;
    return Math.min(scaleX, scaleY);
  }

  public draw() {
    const layer: Layer = this.stage.findOne('#content');
    layer.batchDraw();
  }

  public center() {
    const layer: Layer = this.stage.findOne('#content');
    const artboard = this.stage.findOne('#artboard');
    const box = artboard.getClientRect({skipTransform: false});

    layer.x((this.stage.width() - box.width) / 2);

    if (box.height < this.stage.height()) {
      layer.y((this.stage.height() - box.height) / 2);
    } else if (layer.y() > 0) {
      layer.y(0);
    }
  }

  private clipArtboard() {
    const layer: Layer = this.stage.findOne('#content');

    layer.add(new Konva.Rect({
      x: 0,
      y: 0,
      width: this.artboard.frame.width,
      height: this.artboard.frame.height,
      fill: '#ddd',
      globalCompositeOperation: 'destination-in',
      listening: false
    }));
  }

  private bindMouse() {
    const layer: Layer = this.stage.findOne('#content');

    const mousedown = fromEvent(document, 'mousedown');
    mousedown.pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
      if(!(event instanceof MouseEvent)) {
        return;
      }

      const target: any = event.composedPath()[0];
      if (target.tagName !== 'CANVAS' || event.button !== 0) {
        return;
      }

      if (this.spacePressed) {
        layer.startDrag();
      }
    });

    const mouseup = fromEvent(document, 'mouseup');
    mouseup.pipe(takeUntil(this.destroy$)).subscribe(() => {
      layer.stopDrag();
    });
  }

  private bindKeyboard() {
    const keyup = fromEvent(document, 'keyup');
    keyup.pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
      if(!(event instanceof KeyboardEvent)) {
        return;
      }

      this.spacePressed = false;

      if (event.key === '+') {
        this.zoom(1);
      }

      if (event.key === '-') {
        this.zoom(-1);
      }
    });

    const keydown = fromEvent(document, 'keydown');
    keydown.pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
      if(!(event instanceof KeyboardEvent)) {
        return;
      }

      if (event.key === ' ') {
        this.spacePressed = true;
      }
    });
  }

  private bindResize() {
    const resize = fromEvent(window, 'resize');
    const canvas: Element = this.stage.container();
    const parent: Element = canvas.parentNode as Element;

    resize.pipe(takeUntil(this.destroy$)).subscribe(event => {
      this.htmlRenderer.setStyle(canvas, 'display', 'none');
      this.stage.width(parent.clientWidth);
      this.stage.height(parent.clientHeight);
      this.htmlRenderer.setStyle(canvas, 'display', 'block');

      this.stage.batchDraw();
    });
  }

  private bindWheel() {
    const layer: Layer = this.stage.findOne('#content');
    const artboard: Layer = this.stage.findOne('#artboard');

    this.stage.on('wheel', (e) => {
      e.evt.preventDefault();

      let y = layer.y() + e.evt.deltaY * -1;
      let x = layer.x() + e.evt.deltaX * -1;

      const maxY = (artboard.height() - this.stage.height()) * -1;
      if (y > 0) {
        y = 0;
      } else if (y < maxY) {
        y = maxY;
      }

      const maxX = (artboard.width() - this.stage.width()) * -1;
      if (x >= 0) {
        x = 0;
      } else if (x < maxX) {
        x = maxX;
      }

      layer.y(y);
      layer.x(x);
      layer.batchDraw();
    });
  }

  private createContentLayer(width: number, height: number) {
    const layer = new Konva.Layer({
      id: 'content',
    });

    layer.add(new Konva.Rect({
      id: 'artboard',
      width,
      height,
      x: 0,
      y: 0,
      fill: '#fff'
    }));

    return layer;
  }


  private createBackgroundLayer(width: number, height: number) {
    const background = new Konva.Layer();
    background.add(new Konva.Rect({
      id: 'background',
      x: 0,
      y: 0,
      width: width * 2,
      height: height * 2,
      fill: '#f8f9fa',
    }));

    return background;
  }

  private zoom(direction: number) {
    const layer: Layer = this.stage.findOne('#content');
    let scale = layer.scaleX();

    if (direction > 0) {
      scale *= SCALE_FACTOR;
    } else {
      scale /= SCALE_FACTOR;
    }

    if (scale > 1.3) {
      return null;
    }

    const box = layer.getClientRect({skipTransform: true});
    const stageSize = layer.getSize();
    const position = layer.position();

    if (isNaN(box.width) || isNaN(position.x)) {
      return null;
    }

    const scaleX = stageSize.width / box.width;
    const scaleY = stageSize.height / box.height;
    const scaleValue = Math.max(scaleX, scaleY);

    if (scale < scaleValue) {
      scale = scaleValue;
    }

    layer.scale({x: scale, y: scale});
    layer.batchDraw();

    return Math.floor(scale * 100);
  }
}

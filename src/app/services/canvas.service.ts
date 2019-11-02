import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import Konva from 'konva';
import {SketchService} from './sketch.service';
import {Renderer} from '../renderers/renderer';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

const SCALE_FACTOR = 1.1;

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private htmlRenderer: Renderer2;
  private stage;
  private artboard;

  private spacePressed: boolean;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sketch: SketchService, rendererFactory: RendererFactory2) {
    this.htmlRenderer = rendererFactory.createRenderer(null, null);
  }

  public zoomIn() {
    this.zoom(1);
  }

  public zoomOut() {
    this.zoom(-1);
  }

  public fit() {
    const layer = this.stage.findOne('#content');
    const artboard = this.stage.findOne('#artboard');
    const stageSize = this.stage.getSize();

    const box = artboard.getClientRect({relativeTo: this.stage});
    const scaleX = stageSize.width / box.width;
    const scaleY = stageSize.height / box.height;
    const scaleValue = Math.min(scaleX, scaleY) * .95;

    layer.scale({
      x: scaleValue,
      y: scaleValue
    });

    this.center();
  }

  public draw() {
    const layer = this.stage.findOne('#content');
    layer.draw();
  }

  public center() {
    const layer = this.stage.findOne('#content');
    const artboard = this.stage.findOne('#artboard');
    const box = artboard.getClientRect({skipTransform: false});

    layer.x((this.stage.width() - box.width) / 2);

    if (box.height < this.stage.height()) {
      layer.y((this.stage.height() - box.height) / 2);
    } else if (layer.y() > 0) {
      layer.y(0);
    }
  }

  public createArtboard(container, artboard) {
    this.artboard = artboard;
    this.stage = new Konva.Stage({
      container,
      width: container.parentNode.clientWidth,
      height: container.parentNode.clientHeight,
    });

    const {width, height} = artboard.frame;

    this.stage.add(this.createBackgroundLayer(width, height));
    this.stage.add(this.createContentLayer(width, height));

    this.bindWheel();
    this.bindKeyboard();
    this.bindMouse();
    this.bindResize();

    return this.stage;
  }

  public render() {
    const layer = this.stage.findOne('#content');

    for (const item of this.artboard.layers) {
      const sketch: Renderer = this.sketch.getFactory(item._class);

      if (!sketch) {
        continue;
      }

      const result = sketch.render(item);
      result.forEach((i) => layer.add(i));
    }

    this.clipArtboard();
    this.center();

    this.stage.draw();
  }

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stage.destroy();
    this.stage = null;
  }

  private clipArtboard() {
    const layer = this.stage.findOne('#content');

    layer.add(new Konva.Rect({
      x: 0,
      y: 0,
      width: this.artboard.frame.width,
      height: this.artboard.frame.height,
      fill: '#ddd',
      globalCompositeOperation: 'destination-in'
    }));
  }

  private bindMouse() {
    const layer = this.stage.findOne('#content');

    const mousedown = fromEvent(document, 'mousedown');
    mousedown.pipe(takeUntil(this.destroy$)).subscribe((event: MouseEvent) => {
      const target: any = event.composedPath()[0];
      if (target.tagName !== 'CANVAS' || event.button !== 0) {
        return;
      }

      if (this.spacePressed) {
        layer.startDrag();
      }
    });

    const mouseup = fromEvent(document, 'mouseup');
    mouseup.pipe(takeUntil(this.destroy$)).subscribe((event: MouseEvent) => {
      layer.stopDrag();
    });
  }

  private bindKeyboard() {
    const keyup = fromEvent(document, 'keyup');
    keyup.pipe(takeUntil(this.destroy$)).subscribe((event: KeyboardEvent) => {
      this.spacePressed = false;

      if (event.key === '+') {
        this.zoom(1);
      }

      if (event.key === '-') {
        this.zoom(-1);
      }
    });

    const keydown = fromEvent(document, 'keydown');
    keydown.pipe(takeUntil(this.destroy$)).subscribe((event: KeyboardEvent) => {
      if (event.key === ' ') {
        this.spacePressed = true;
      }
    });
  }

  private bindResize() {
    const resize = fromEvent(window, 'resize');
    const canvas = this.stage.container();

    resize.pipe(takeUntil(this.destroy$)).subscribe(event => {
      this.htmlRenderer.setStyle(canvas, 'display', 'none');
      this.stage.width(canvas.parentNode.clientWidth);
      this.stage.height(canvas.parentNode.clientHeight);
      this.htmlRenderer.setStyle(canvas, 'display', 'block');

      this.stage.draw();
    });
  }

  private bindWheel() {
    const layer = this.stage.findOne('#content');
    const artboard = this.stage.findOne('#artboard');

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
      layer.draw();
    });
  }

  private createContentLayer(width, height) {
    const layer = new Konva.Layer({
      id: 'content',
      dragBoundFunc: (pos) => {
        const artboard = this.stage.findOne('#artboard');
        const box = artboard.getClientRect({skipTransform: false});

        const paddingWidth = this.stage.width() / 4;
        const paddingHeight = this.stage.height() / 4;

        const spaceWidth = this.stage.width() - paddingWidth - paddingWidth;
        const spaceHeight = this.stage.height() - paddingHeight - paddingHeight;

        if (box.width > spaceWidth) {
          if (pos.x > paddingWidth) {
            pos.x = paddingWidth;
          } else if (pos.x < -paddingWidth) {
            pos.x = -paddingWidth;
          }
        } else {
          if (pos.x < paddingWidth) {
            pos.x = paddingWidth;
          } else if (pos.x > this.stage.width() - paddingWidth - box.width) {
            pos.x = this.stage.width() - paddingWidth - box.width;
          }
        }

        if (box.height > spaceHeight) {
          const bottom = (box.height - this.stage.height() + paddingHeight) * -1;
          if (pos.y > paddingHeight) {
            pos.y = paddingHeight;
          } else if (pos.y < bottom) {
            pos.y = bottom;
          }
        }

        return pos;
      }
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


  private createBackgroundLayer(width, height) {
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

  private zoom(direction) {
    const layer = this.stage.findOne('#content');
    let scale = layer.scaleX();

    if (direction > 0) {
      scale *= SCALE_FACTOR;
    } else {
      scale /= SCALE_FACTOR;
    }

    if (scale > 1.3) {
      return;
    }

    const box = layer.getClientRect({skipTransform: true});
    const stageSize = layer.getSize();
    const position = layer.position();

    if (isNaN(box.width) || isNaN(position.x)) {
      return;
    }

    const scaleX = stageSize.width / box.width;
    const scaleY = stageSize.height / box.height;
    const scaleValue = Math.max(scaleX, scaleY);

    if (scale < scaleValue) {
      scale = scaleValue;
    }

    layer.scale({x: scale, y: scale});
    layer.draw();
  }
}


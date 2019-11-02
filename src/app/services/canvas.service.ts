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

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sketch: SketchService, rendererFactory: RendererFactory2) {
    this.htmlRenderer = rendererFactory.createRenderer(null, null);
  }

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stage.destroy();
    this.stage = null;
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
    this.stage.draw();
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

  private bindKeyboard() {
    const layer = this.stage.findOne('#content');

    const keyup = fromEvent(document, 'keyup');

    keyup.pipe(takeUntil(this.destroy$)).subscribe((event: KeyboardEvent) => {
      layer.draggable(false);

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
        layer.draggable(true);
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
      id: 'content'
    });

    layer.add(new Konva.Rect({
      id: 'artboard',
      width,
      height,
      x: 0,
      y: 0,
      fill: '#fff',
    }));

    return layer;
  }

  private createBackgroundLayer(width, height) {
    const background = new Konva.Layer();
    background.add(new Konva.Rect({
      id: 'background',
      x: 0,
      y: 0,
      width,
      height,
      fill: '#f8f9fa',
    }));

    return background;
  }

  private zoom(direction) {
    const layer = this.stage.findOne('#content');
    const originalScale = layer.scaleX();
    let scale = originalScale;

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
    let position = layer.position();

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

    const newWidth = box.width * scale;
    const newHeight = box.height * scale;
    const centerX = (stageSize.width / 2);
    const centerY = (stageSize.height / 2);

    const mousePointTo = {
      x: centerX / originalScale - layer.x() / originalScale,
      y: centerY / originalScale - layer.y() / originalScale
    };

    position = {
      x: -(mousePointTo.x - centerX / scale) * scale,
      y: -(mousePointTo.y - centerY / scale) * scale
    };

    if (position.x > 0) {
      position.x = 0;
    }

    if (position.y > 0) {
      position.y = 0;
    }

    if (newHeight + position.y < stageSize.height) {
      position.y = stageSize.height - newHeight;
    }

    if (newWidth + position.x < stageSize.width) {
      position.x = stageSize.width - newWidth;
    }

    layer.position(position);
    layer.batchDraw();
  }
}

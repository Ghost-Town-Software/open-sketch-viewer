import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import Konva from 'konva';
import {SketchService} from './sketch.service';
import {Renderer} from '../renderers/renderer';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {
  private stage;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sketch: SketchService) {
  }

  public fit() {
    const layer = this.stage.findOne('#preview1');
    const stageSize = this.stage.getSize();

    const box = layer.getClientRect({relativeTo: this.stage});
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
    const layer = this.stage.findOne('#preview1');
    layer.draw();
  }

  public center() {
    const layer = this.stage.findOne('#preview1');
    const box = layer.getClientRect({skipTransform: false});

    console.log('center', this.stage.width(), box.width);

    layer.x((this.stage.width() - box.width) / 2);

    if (box.height < this.stage.height()) {
      layer.y((this.stage.height() - box.height) / 2);
    } else if (layer.y() > 0) {
      layer.y(0);
    }
  }

  public createPreview(container) {
    this.stage = new Konva.Stage({
      container,
      width: container.parentNode.clientWidth,
      height: container.parentNode.clientHeight,
    });

    console.log({
      width: container.parentNode.clientWidth,
      height: container.parentNode.clientHeight,
    });

    this.stage.add(new Konva.Layer({
      id: 'preview1'
    }));

    return this.stage;
  }

  public render(item) {
    const layer = this.stage.findOne('#preview1');
    layer.clear();

    const sketch: Renderer = this.sketch.getFactory(item._class);

    if (!sketch) {
      return;
    }

    const rect = sketch.render(item);
    rect.position({x: 0, y: 0});

    layer.add(rect);

    this.center();


    this.stage.draw();
  }

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stage.destroy();
    this.stage = null;
  }
}


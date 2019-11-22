import {Injectable} from '@angular/core';
import Konva from 'konva';
import {Subject} from 'rxjs';
import {BaseComponent} from '../sketch/models/base-component.model';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {
  private stage;

  private destroy$: Subject<void> = new Subject<void>();

  constructor() {
  }

  public render(component: BaseComponent) {
    const layer = this.stage.findOne('#preview1');
    layer.clear();

    const rect = component.render();
    rect.position({x: 0, y: 0});

    layer.add(rect);

    this.center();

    this.stage.batchDraw();

    return rect;
  }

  public fit(): number {
    const layer = this.stage.findOne('#preview1');
    const stageSize = this.stage.getSize();

    const box = layer.getClientRect({relativeTo: this.stage});
    const scaleX = stageSize.width / box.width;
    const scaleY = stageSize.height / box.height;
    const effectiveScale = Math.min(scaleX, scaleY);
    const scaleValue = effectiveScale * .85;

    layer.scale({
      x: scaleValue,
      y: scaleValue
    });

    this.center();
    return Math.floor(effectiveScale * 100);
  }

  public clear() {
    const layer = this.stage.findOne('#preview1');
    layer.destroyChildren();
  }

  public draw() {
    const layer = this.stage.findOne('#preview1');
    layer.batchDraw();
  }

  public center() {
    const layer = this.stage.findOne('#preview1');
    const box = layer.getClientRect({skipTransform: false});

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

    this.stage.add(new Konva.Layer({
      id: 'preview1'
    }));

    return this.stage;
  }

  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stage.destroy();
    this.stage = null;
  }
}


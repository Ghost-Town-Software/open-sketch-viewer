import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Stage} from 'konva/types/Stage';
import {Layer} from 'konva/types/Layer';
import {Point} from '../model/point.model';
import {KonvaGroup, KonvaShape} from '../model/konva.model';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  workspaceLayer$: BehaviorSubject<string> = new BehaviorSubject(null);
  attributeLayer$: BehaviorSubject<string> = new BehaviorSubject(null);

  bindEvents(stage: Stage) {
    this.workspaceLayer$.subscribe(do_objectID => {
      if(!do_objectID) {
        return;
      }

      const content: Layer = stage.findOne('#content');
      const layer: KonvaGroup | KonvaShape = content.findOne('#' + do_objectID);

      if(!layer) {
        return;
      }

      this.centerElement(stage, layer);
    });
  }

  getElementPosition(content: KonvaGroup | KonvaShape, layer: KonvaGroup | KonvaShape): Point {
    const contentPos = content.getAbsolutePosition();
    const pos = layer.getAbsolutePosition();

    pos.x -= contentPos.x;
    pos.y -= contentPos.y;

    return { x: pos.x, y: pos.y };
  }

  centerElement(stage: Stage, layer: KonvaGroup | KonvaShape) {
    const content: Layer = stage.findOne('#content');

    const xPad = 100;
    const yPad = 100;

    let {x, y} = this.getElementPosition(content, layer);

    x -= xPad;
    y -= yPad;

    content.x(-x);
    content.y(-y);

    stage.batchDraw();
  }
}

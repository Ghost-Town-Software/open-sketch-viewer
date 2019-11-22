import {Injectable} from '@angular/core';
import {AsyncSubject, BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  workspaceLayer$: BehaviorSubject<string> = new BehaviorSubject(null);
  attributeLayer$: BehaviorSubject<string> = new BehaviorSubject(null);

  bindEvents(stage) {
    this.workspaceLayer$.subscribe(do_objectID => {
      console.log('received event workspaceLayer$ ', do_objectID);
      if(!do_objectID) {
        return;
      }

      const content = stage.findOne('#content');
      const layer = content.findOne('#' + do_objectID);

      if(!layer) {
        return;
      }

      this.centerElement(stage, layer);

    });
  }

  getElementPosition(content, layer) {
    const contentPos = content.getAbsolutePosition();
    const pos = layer.getAbsolutePosition();

    pos.x -= contentPos.x;
    pos.y -= contentPos.y;

    console.log('element position', pos);

    return { x: pos.x, y: pos.y };
  }

  centerElement(stage, layer) {
    const content = stage.findOne('#content');

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

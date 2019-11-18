import {Injectable} from '@angular/core';
import {ProjectService} from './project.service';
import Konva from 'konva';
import {ModelFactory} from '../sketch/models/model-factory';

@Injectable({
  providedIn: 'root'
})
export class DebugService {
  private stage: any;

  constructor(private project: ProjectService) {

  }

  public render(container, objectID) {
    const object = this.project.find(objectID);

    this.stage = new Konva.Stage({
      container,
      width: container.parentNode.clientWidth,
      height: container.parentNode.clientHeight,
    });

    const layer = new Konva.Layer();
    const model = this.buildModel(object);

    if(model) {
      const shape = model.render();
      shape.x(0);
      shape.y(0);

      if(shape) {
        layer.add(shape);
      }
    } else {
      console.error('Not implemented yet', object._class);
    }

    this.stage.add(layer);

    this.center(layer);

    this.stage.batchDraw();
  }

  public center(layer) {
    const box = layer.getClientRect({skipTransform: false});
    layer.x((this.stage.width() - box.width) / 2);

    if (box.height < this.stage.height()) {
      layer.y((this.stage.height() - box.height) / 2);
    } else if (layer.y() > 0) {
      layer.y(0);
    }
  }


  private buildModel(payload) {
    const model = ModelFactory.create(payload);

    if(model && payload.layers) {
      model.layers = payload.layers.map((item) => this.buildModel(item));
    }

    return model;
  }

}

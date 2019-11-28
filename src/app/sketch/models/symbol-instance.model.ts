import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {getService} from '../../injector.static';
import {SymbolMaster} from './symbol-master.model';
import {NewProjectService} from '../../project/project.service';

export class SymbolInstance extends BaseComponent {
  readonly _class: string = 'symbolInstance';

  symbolID: string;
  project: NewProjectService;

  constructor(payload) {
    super(payload);

    this.symbolID = payload.symbolID;
    this.project = getService(NewProjectService);
  }

  render() {
    const master: SymbolMaster = this.project.getSymbolMaster(this.symbolID);

    this.canvas = new Konva.Group({
      ...this.frame,
      ...this.style.value(),
      transformsEnabled: 'position',
    });

    if(!master) {
      return this.canvas;
    }

    master.frame.x = 0;
    master.frame.y = 0;

    this.flip(this.canvas);

    const shape = master.render();
    const scaleX = this.frame.width / master.frame.width;
    const scaleY = this.frame.height / master.frame.height;

    shape.transformsEnabled('all');
    shape.width(master.frame.width * scaleX);
    shape.height(master.frame.height * scaleY);
    shape.scale({x: this.frame.width / master.frame.width, y: this.frame.height / master.frame.height});

    this.canvas.add(shape);

    return this.canvas;
  }
}

import {BaseComponent} from './base-component.model';
import Konva from 'konva';
import {getService} from '../../injector.static';
import {ProjectService} from '../../services/project.service';
import {SymbolMaster} from './symbol-master.model';

export class SymbolInstance extends BaseComponent {
  readonly _class: string = 'symbolInstance';

  symbolID: string;
  project: ProjectService;

  constructor(payload) {
    super(payload);

    this.symbolID = payload.symbolID;
    this.project = getService(ProjectService);
  }

  render() {
    const master: SymbolMaster = this.project.getSymbolMaster(this.symbolID);

    this.canvas = new Konva.Group({
      ...this.frame,
      ...this.style.value(),
      transformsEnabled: 'position',
    });

    this.flip(this.canvas);

    this.canvas.add(master.render());

    return this.canvas;
  }
}

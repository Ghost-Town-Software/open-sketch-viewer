import {Component, Input, OnInit} from '@angular/core';
import {LayerService} from '../../services/layer.service';
import {BaseComponent} from '../../sketch/models/base-component.model';

@Component({
  selector: 'structure-panel',
  templateUrl: './structure-panel.template.html',
  styleUrls: ['./structure-panel.styles.scss']
})
export class StructurePanelComponent {
  activeLayer: any;

  private _layers: BaseComponent[];

  @Input()
  set layers(layers: BaseComponent[]) {
    this._layers = this.mapElements(layers);
  }

  get layers(): BaseComponent[] {
    return this._layers;
  }

  constructor(private layerService: LayerService) {}

  private mapElements(elements: BaseComponent[]) {
    let index = 0;

    const recurrence = (list: BaseComponent[]) => {
      const result = [];

      if (!list) {
        return list;
      }

      for (const element of list) {
        const e = Object.assign({row: index % 2 === 0 ? 'odd' : 'even'}, element);
        index++;

        e.layers = recurrence(element.layers);
        result.push(e);
      }

      return result;
    };

    return recurrence(elements);
  }

  toggleCollapse(event: Event, layer: any) {
    event.stopPropagation();
    layer.collapsed = !layer.collapsed;
  }

  focusItem(event: Event, layer: any) {
    event.stopPropagation();

    if (this.activeLayer) {
      this.activeLayer.active = false;
    }

    this.activeLayer = layer;
    this.activeLayer.active = true;
    this.layerService.workspaceLayer$.next(layer.do_objectID);
    this.layerService.attributeLayer$.next(layer.do_objectID);
  }
}

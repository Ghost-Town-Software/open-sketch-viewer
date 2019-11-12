import {Component, Input, OnInit, Renderer2, ViewChildren} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'structure-panel',
  templateUrl: './structure-panel.template.html',
  styleUrls: ['./structure-panel.styles.scss']
})
export class StructurePanelComponent implements OnInit {

  activeLayer: any;

  private _layers: any[];

  ngOnInit(): void {

  }

  private mapElements(elements) {
    let index = 0;

    const recurrence = (list) => {
      const result = [];

      if(!list) {
        return list;
      }

      for(const element of list) {
        const e = Object.assign({row: index % 2 === 0 ? 'odd' : 'even'}, element);
        index++;

        e.layers = recurrence(element.layers);
        result.push(e);
      }

      return result;
    };

    return recurrence(elements);
  }

  toggleCollapse($event, layer: any) {
    $event.stopPropagation();
    layer.collapsed = !layer.collapsed;
  }

  focusItem($event, layer: any) {
    $event.stopPropagation();

    if (this.activeLayer) {
      this.activeLayer.active = false;
    }

    this.activeLayer = layer;
    this.activeLayer.active = true;
  }

  @Input()
  set layers(layers) {
    this._layers = this.mapElements(layers);
  }

  get layers() {
    return this._layers;
  }
}

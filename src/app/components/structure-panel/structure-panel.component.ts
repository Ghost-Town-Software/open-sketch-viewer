import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LayerService} from '../../services/layer.service';

@Component({
  selector: 'structure-panel',
  templateUrl: './structure-panel.template.html',
  styleUrls: ['./structure-panel.styles.scss']
})
export class StructurePanelComponent implements OnInit {

  activeLayer: any;

  private _layers: any[];

  constructor(private layerService: LayerService) {}

  ngOnInit(): void {

  }

  private mapElements(elements) {
    let index = 0;

    const recurrence = (list) => {
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
    this.layerService.workspaceLayer$.next(layer.do_objectID);
  }

  @Input()
  set layers(layers) {
    this._layers = this.mapElements(layers);
  }

  get layers() {
    return this._layers;
  }
}

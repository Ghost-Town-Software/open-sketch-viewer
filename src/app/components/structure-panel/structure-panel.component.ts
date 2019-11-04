import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'structure-panel',
  templateUrl: './structure-panel.template.html',
  styleUrls: ['./structure-panel.styles.scss']
})
export class StructurePanelComponent implements OnInit {

  @Input()
  layers: any[];

  activeLayer: any;

  ngOnInit(): void {
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
}

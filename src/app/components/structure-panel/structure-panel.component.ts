import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'structure-panel',
  templateUrl: './structure-panel.template.html',
  styleUrls: ['./structure-panel.styles.scss']
})
export class StructurePanelComponent implements OnInit {

  @Input()
  layers: any[];

  ngOnInit(): void {
    console.log('layers', this.layers);
  }

}

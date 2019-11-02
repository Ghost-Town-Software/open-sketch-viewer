import {Component, OnInit} from '@angular/core';
import {CanvasService} from '../../services/canvas.service';

@Component({
  selector: 'attributes-panel',
  templateUrl: './attributes-panel.template.html',
  styleUrls: ['./attributes-panel.styles.scss']
})
export class AttributesPanelComponent implements OnInit {

  constructor(private canvas: CanvasService) {

  }

  ngOnInit(): void {
  }


  zoomIn() {
    this.canvas.zoomIn();
  }

  zoomOut() {
    this.canvas.zoomOut();
  }

  fit() {
    this.canvas.fit();
    this.canvas.draw();
  }

  center() {
    this.canvas.center();
    this.canvas.draw();
  }
}

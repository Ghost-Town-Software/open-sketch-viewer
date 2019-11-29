import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CanvasService} from '../../services/canvas.service';
import {PreviewService} from '../../services/preview.service';
import {LayerService} from '../../services/layer.service';
import {BaseComponent} from '../../sketch/models/base-component.model';
import {NewProjectService} from '../project.service';

@Component({
  selector: 'attributes-panel',
  templateUrl: './attributes-panel.template.html',
  styleUrls: ['./attributes-panel.styles.scss']
})
export class AttributesPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('preview', {static: true}) previewEl;
  styles: string;
  attributes: string;

  currentZoom: number;

  activeLayer: BaseComponent;

  constructor(private projectService: NewProjectService,
              private canvas: CanvasService,
              private preview: PreviewService,
              private layerService: LayerService) {

  }

  ngAfterViewInit(): void {
    this.preview.createPreview(this.previewEl.nativeElement);
  }

  ngOnInit(): void {
    this.currentZoom = 100.0;

    this.layerService.attributeLayer$.subscribe(do_objectID => {
      const layer = this.projectService.getArtboardLayer(do_objectID);
      this.activeLayer = layer;
      this.styles = layer ? layer.getStyles() : null;

      if(this.activeLayer) {
        this.preview.clear();
        this.preview.render(layer);
        this.preview.fit();
      }
    });
  }

  zoomIn() {
    const zoom = this.canvas.zoomIn();
    if (zoom) {
      this.currentZoom = zoom;
    }
  }

  zoomOut() {
    const zoom = this.canvas.zoomOut();
    if (zoom) {
      this.currentZoom = zoom;
    }
  }

  fit() {
    this.currentZoom = this.canvas.fit();
    this.canvas.draw();
  }

  center() {
    this.canvas.center();
    this.canvas.draw();
  }
}

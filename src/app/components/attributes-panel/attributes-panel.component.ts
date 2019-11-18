import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CanvasService} from '../../services/canvas.service';
import {PreviewService} from '../../services/preview.service';

@Component({
  selector: 'attributes-panel',
  templateUrl: './attributes-panel.template.html',
  styleUrls: ['./attributes-panel.styles.scss']
})
export class AttributesPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('preview', {static: true}) previewEl;
  styles: string;

  currentZoom: number;

  constructor(private canvas: CanvasService, private preview: PreviewService) {

  }

  ngAfterViewInit(): void {
    this.preview.createPreview(this.previewEl.nativeElement);
  }

  ngOnInit(): void {
    this.currentZoom = 100.0;
  }

  private getHumanStyles(attrs) {
    const style = attrs.style;
    const parts: any = {};
    parts.width = attrs.frame.width + 'px';
    parts.height = attrs.frame.height + 'px';

    if (style.blur.isEnabled) {
      console.log('Blur is not implemented yet.');
    }

    if (style.borderOptions.isEnabled) {
    }

    if (style.borders.length) {
      if (style.borders.length > 1) {
        console.warn('Item has more than one borders', attrs);
      }

      parts.border = '';
    }

    if (style.contextSettings.opacity) {
      parts.opacity = Math.round(style.contextSettings.opacity * 100) / 100;
    }

    const res: any = [];
    for (const key in parts) {
      if (!parts.hasOwnProperty(key)) {
        continue;
      }

      res.push(key + ': ' + parts[key] + ';');
    }

    return res.join('\n');
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

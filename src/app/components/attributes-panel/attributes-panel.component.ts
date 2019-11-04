import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CanvasService} from '../../services/canvas.service';
import {SketchService} from '../../services/sketch.service';
import {PreviewService} from '../../services/preview.service';

@Component({
  selector: 'attributes-panel',
  templateUrl: './attributes-panel.template.html',
  styleUrls: ['./attributes-panel.styles.scss']
})
export class AttributesPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('preview', {static: true}) previewEl;
  styles: string;

  constructor(private canvas: CanvasService, private sketch: SketchService, private preview: PreviewService) {

  }

  ngAfterViewInit(): void {
    this.preview.createPreview(this.previewEl.nativeElement);
  }

  ngOnInit(): void {
    this.sketch.getClickState().subscribe(res => {
      console.log('res', res);

      this.styles = this.getHumanStyles(res.attrs);
      this.preview.render(res.attrs);
      this.preview.fit();
      this.preview.draw();
    });
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

      for (const border of style.borders) {
        if (!border.isEnabled) {
          continue;
        }

        const red = Math.round(border.color.red * 255);
        const green = Math.round(border.color.green * 255);
        const blue = Math.round(border.color.blue * 255);
        const alpha = border.color.alpha;


        parts.border = `${border.thickness}px solid rgba(${red}, ${green}, ${blue}, ${alpha})`;
      }
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

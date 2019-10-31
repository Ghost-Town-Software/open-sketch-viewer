import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import Konva from 'konva';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.template.html',
  styleUrls: ['./workspace.styles.scss']
})
export class WorkspaceComponent implements OnInit, AfterViewInit {
  @Input() artboard: any;
  @ViewChild('canvas', {static: true}) canvas;
  @ViewChild('scroll', {static: true}) scroll;

  private stage;

  constructor(private elementRef: ElementRef, private project: ProjectService, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    console.log('artboard', this.artboard);
  }

  ngAfterViewInit() {
    this.draw();
  }

  private draw() {
    this.stage = new Konva.Stage({
      container: this.canvas.nativeElement,
      width: this.elementRef.nativeElement.clientWidth,
      height: this.elementRef.nativeElement.clientHeight
    });

    // add canvas element
    const layer = new Konva.Layer();
    this.stage.add(layer);

    layer.add(new Konva.Rect({
      x: 0,
      y: 0,
      width: this.artboard.frame.width,
      height: this.artboard.frame.height,
      fill: '#ddd'
    }));

    const preview = this.project.getPreview();

    Konva.Image.fromURL(preview, (darthNode) => {
      darthNode.setAttrs({
        x: 0,
        y: 0
      });
      layer.add(darthNode);
      layer.batchDraw();
    });

    layer.add(new Konva.Circle({
      x: 100,
      y: this.artboard.frame.height - 500,
      radius: 50,
      fill: 'red',
      stroke: 'black'
    }));

    layer.draw();

    this.stage.on('wheel', (e) => {
      const rect = this.stage.getClientRect({skipTransform: false});
      let y = this.stage.y() + e.evt.deltaY * -1;
      let x = this.stage.x() + e.evt.deltaX * -1;

      if (y > 0) {
        y = 0;
      }

      const maxY = (rect.height - this.elementRef.nativeElement.clientHeight) * -1;
      if (y < maxY) {
        y = maxY;
      }

      if (x > 0) {
        x = 0;
      }

      const maxX = (rect.width - this.elementRef.nativeElement.clientWidth) * -1;
      if (x < maxX) {
        x = maxX;
      }

      this.stage.y(y);
      this.stage.x(x);
      this.stage.draw();
    });
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateSize();
    this.stage.draw();
  }

  private updateSize() {
    const canvas = this.canvas.nativeElement;

    this.renderer.setStyle(canvas, 'display', 'none');
    this.stage.width(this.elementRef.nativeElement.clientWidth);
    this.stage.height(this.elementRef.nativeElement.clientHeight);
    this.renderer.setStyle(canvas, 'display', 'block');
  }
}

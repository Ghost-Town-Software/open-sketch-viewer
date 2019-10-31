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
  private ovals;

  constructor(private elementRef: ElementRef, private project: ProjectService, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    console.log('artboard', this.artboard);
  }

  ngAfterViewInit() {
    this.draw();
    this.render();
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

    this.ovals = new Konva.Layer();
    this.stage.add(this.ovals);
    layer.add(new Konva.Rect({
      x: 0,
      y: 0,
      width: this.artboard.frame.width,
      height: this.artboard.frame.height,
      fill: '#ddd'
    }));

    // layer.add(new Konva.Circle({
    //   x: 100,
    //   y: 100,
    //   radius: 50,
    //   fill: 'red',
    //   stroke: 'black'
    // }));

    layer.draw();

    this.stage.on('wheel', (e) => {
      e.evt.preventDefault();

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
      this.render();
    });
  }

  private getValueByPercent(point, long, percent) {
    return point + (long * percent);
  }

  private render() {
    for (const item of this.artboard.layers) {
      if (item._class !== 'oval') {
        continue;
      }

      console.log('frame', item.frame);
      this.drawRect(item.frame);

      const rect = this.stage.getClientRect({skipTransform: false});
      const context = this.ovals.getContext();

      for (let i = 0; i < item.points.length; i++) {
        const point = item.points[i];

        const control1 = JSON.parse(point.curveFrom.replace('{', '[').replace('}', ']'));
        const control2 = JSON.parse(point.curveTo.replace('{', '[').replace('}', ']'));
        const from = JSON.parse(point.point.replace('{', '[').replace('}', ']'));

        let toPoint = item.points[0];
        if (i + 1 < item.points.length) {
          toPoint = item.points[i + 1];
        }

        const to = JSON.parse(toPoint.point.replace('{', '[').replace('}', ']'));

        context.beginPath();
        context.moveTo(
          50,
          100
        );
        context.quadraticCurveTo( 77,  22, 22, 77);
        context.bezierCurveTo( 100,  22, 100, 77, 50, 0);
        context.bezierCurveTo( 22,  0, 77, 0, 0, 50);
        context.bezierCurveTo( 0,  77, 0, 22, 50, 100);

        context.setAttr('strokeStyle', 'blue');
        context.setAttr('lineWidth', 4);
        context.stroke();

        // context.moveTo(
        //   this.getValueByPercent(item.frame.x, item.frame.width, from[0]) + rect.x,
        //   this.getValueByPercent(item.frame.y, item.frame.height, from[1]) + rect.y
        // );
        //
        // context.bezierCurveTo(
        //   this.getValueByPercent(item.frame.x, item.frame.width, control1[0]) + rect.x,
        //   this.getValueByPercent(item.frame.y, item.frame.height, control1[1]) + rect.y,
        //   this.getValueByPercent(item.frame.x, item.frame.width, control2[0]) + rect.x,
        //   this.getValueByPercent(item.frame.y, item.frame.height, control2[1]) + rect.y,
        //   this.getValueByPercent(item.frame.x, item.frame.width, to[0]) + rect.x,
        //   this.getValueByPercent(item.frame.y, item.frame.height, to[1]) + rect.y,
        // );

        // context.setAttr('strokeStyle', 'blue');
        // context.setAttr('lineWidth', 4);
        // context.stroke();

        // this.drawCurves(this.ovals,
        //   this.getValueByPercent(item.frame.x, item.frame.width, from[0]),
        //   this.getValueByPercent(item.frame.y, item.frame.height, from[1]),
        //   this.getValueByPercent(item.frame.x, item.frame.width, p[0]),
        //   this.getValueByPercent(item.frame.y, item.frame.height, p[1]),
        //   this.getValueByPercent(item.frame.x, item.frame.width, to[0]),
        //   this.getValueByPercent(item.frame.y, item.frame.height, to[1])
        // );
      }


    }
  }

  private drawRect(frame) {
    const context = this.ovals.getContext();
    context.beginPath();
    context.rect(frame.x, frame.y, frame.width, frame.height);
    context.setAttr('strokeStyle', 'green');
    context.setAttr('lineWidth', 4);
    context.stroke();
  }

  private drawCurves(layer, fromX, fromY, controlX, controlY, toX, toY) {

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

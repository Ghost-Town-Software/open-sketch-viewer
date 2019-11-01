import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import Konva from 'konva';
import {ProjectService} from '../../services/project.service';

const SCALE_FACTOR = 1.1;

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

  @HostListener('window:keyup', ['$event'])
  onKeyup(event) {
    if (event.key === '+') {
      this.zoom(1);
    }

    if (event.key === '-') {
      this.zoom(-1);
    }
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
    });
  }

  private render() {
    for (const item of this.artboard.layers) {
      if (item._class !== 'oval') {
        continue;
      }

      if (item.name === 'Oval Copy 6') {
        console.log(JSON.stringify(item));
      }

      this.drawRect(item.frame);

      for (let i = 0; i < item.points.length; i++) {
        const point1 = item.points[i];
        let point2 = item.points[0];

        if (i + 1 < item.points.length) {
          point2 = item.points[i + 1];
        }

        this.ovals.add(this.drawOval(item, point1, point2));
      }
    }

    this.stage.draw();
  }

  private applyStyles(shape, style) {
    if (style.blur.isEnabled) {
      console.log('Blur is not implemented yet.');
    }

    if (style.borderOptions.isEnabled) {
    }

    if (style.borders.length) {
      for (const border of style.borders) {
        if (!border.isEnabled) {
          continue;
        }

        const red = border.color.red * 255;
        const green = border.color.green * 255;
        const blue = border.color.blue * 255;
        const alpha = border.color.alpha;

        shape.stroke(`rgba(${red}, ${green}, ${blue}, ${alpha})`);
        shape.strokeWidth(border.thickness);
      }
    }
  }

  private drawOval(item, point1, point2) {
    const control1 = JSON.parse(point1.curveFrom.replace('{', '[').replace('}', ']'));
    const control2 = JSON.parse(point2.curveTo.replace('{', '[').replace('}', ']'));
    const from = JSON.parse(point1.point.replace('{', '[').replace('}', ']'));
    const to = JSON.parse(point2.point.replace('{', '[').replace('}', ']'));

    const figure = new Konva.Shape({
      x: item.frame.x,
      y: item.frame.y,
      stroke: '#00D2FF',
      strokeWidth: 4,
      width: item.frame.width,
      height: item.frame.height,
      sceneFunc: (context, shape) => {
        const rect = this.stage.getClientRect({skipTransform: false});

        context.beginPath();
        context.moveTo(
          from[0] * shape.getAttr('width'), from[1] * shape.getAttr('height')
        );

        context.bezierCurveTo(
          control1[0] * shape.getAttr('width'), control1[1] * shape.getAttr('height'),
          control2[0] * shape.getAttr('width'), control2[1] * shape.getAttr('height'),
          to[0] * shape.getAttr('width'), to[1] * shape.getAttr('height')
        );

        // Konva will apply styles from config
        context.fillStrokeShape(shape);
      }
    });

    this.applyStyles(figure, item.style);

    return figure;
  }

  private drawRect(frame) {
    const context = this.ovals.getContext();
    context.beginPath();
    context.rect(frame.x, frame.y, frame.width, frame.height);
    context.setAttr('strokeStyle', 'green');
    context.setAttr('lineWidth', 4);
    context.stroke();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateSize();
    this.stage.draw();
  }

  private updateBoundaries(oldScale, scale) {
    if (scale > 1.3) {
      return;
    }

    const box = this.stage.getClientRect({skipTransform: true});
    const stageSize = this.stage.getSize();
    let position = this.stage.position();

    if (isNaN(box.width) || isNaN(position.x)) {
      return;
    }

    const scaleX = stageSize.width / box.width;
    const scaleY = stageSize.height / box.height;
    const scaleValue = Math.max(scaleX, scaleY);

    if (scale < scaleValue) {
      scale = scaleValue;
    }

    this.stage.scale({x: scale, y: scale});

    const newWidth = box.width * scale;
    const newHeight = box.height * scale;

    console.log('position', position.x, stageSize.width, stageSize.width / 2);

    const centerX = (stageSize.width / 2);
    const centerY = (stageSize.height / 2);

    const mousePointTo = {
      x: centerX / oldScale - this.stage.x() / oldScale,
      y: centerY / oldScale - this.stage.y() / oldScale
    };

    position = {
      x: -(mousePointTo.x - centerX / scale) * scale,
      y: -(mousePointTo.y - centerY / scale) * scale
    };

    console.log('after', position.x, centerX);

    if (position.x > 0) {
      position.x = 0;
    }

    if (position.y > 0) {
      position.y = 0;
    }

    if (newHeight + position.y < stageSize.height) {
      position.y = stageSize.height - newHeight;
    }

    if (newWidth + position.x < stageSize.width) {
      position.x = stageSize.width - newWidth;
    }

    this.stage.position(position);
    this.stage.batchDraw();
  }

  private zoom(direction) {
    const originalScale = this.stage.scaleX();
    let scale = originalScale;

    if (direction > 0) {
      scale *= SCALE_FACTOR;
    } else {
      scale /= SCALE_FACTOR;
    }

    console.log('original scale', originalScale, scale);
    this.updateBoundaries(originalScale, scale);
  }


  private updateSize() {
    const canvas = this.canvas.nativeElement;

    this.renderer.setStyle(canvas, 'display', 'none');
    this.stage.width(this.elementRef.nativeElement.clientWidth);
    this.stage.height(this.elementRef.nativeElement.clientHeight);
    this.renderer.setStyle(canvas, 'display', 'block');
  }
}

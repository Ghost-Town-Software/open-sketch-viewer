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
  private layer;

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
      height: this.elementRef.nativeElement.clientHeight,
      // draggable: true
    });

    this.stage.clipWidth(this.artboard.frame.width);
    this.stage.clipHeight(this.artboard.frame.height);

    // this.stage.on('dragmove', (e) => {
    //   const stage = e.target;
    //   const y = stage.y();
    //   const x = stage.x();
    //   const rect = this.stage.getClientRect({skipTransform: false});
    //
    //   console.log('move', stage.position(), rect, stage.width(), stage.height());
    //
    //   if (y > 0) {
    //     stage.y(0);
    //   }
    //
    //   const maxY = (stage.height()) * -1;
    //   if (y < maxY) {
    //     stage.y(maxY);
    //   }
    //
    //   if (x > 0) {
    //     stage.x(0);
    //     console.log('lock it');
    //   }
    //
    //   const maxX = (stage.width()) * -1;
    //   if (x < maxX) {
    //     stage.x(maxX);
    //   }
    // });

    // add canvas element
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    // this.stage.on('wheel', (e) => {
    //   e.evt.preventDefault();
    //
    //   const rect = this.stage.getClientRect({skipTransform: false});
    //   let y = this.stage.y() + e.evt.deltaY * -1;
    //   let x = this.stage.x() + e.evt.deltaX * -1;
    //
    //   if (y > 0) {
    //     y = 0;
    //   }
    //
    //   const maxY = (rect.height - this.elementRef.nativeElement.clientHeight) * -1;
    //   if (y < maxY) {
    //     y = maxY;
    //   }
    //
    //   if (x > 0) {
    //     x = 0;
    //   }
    //
    //   const maxX = (rect.width - this.elementRef.nativeElement.clientWidth) * -1;
    //   if (x < maxX) {
    //     x = maxX;
    //   }
    //
    //   this.stage.y(y);
    //   this.stage.x(x);
    //   this.stage.draw();
    // });

    this.scrollbars();
  }

  private scrollbars() {
    // now draw our bars
    const stage = this.stage;
    const layer = this.layer;
    const frame = this.artboard.frame;

    const scrollLayers = new Konva.Layer();
    stage.add(scrollLayers);

    const PADDING = 5;

    const verticalBar = new Konva.Rect({
      width: 10,
      height: 100,
      fill: 'grey',
      opacity: 0.8,
      x: stage.width() - PADDING - 10,
      y: PADDING,
      draggable: true,
      dragBoundFunc: function (pos) {
        pos.x = stage.width() - PADDING - 10;
        pos.y = Math.max(
          Math.min(pos.y, stage.height() - this.height() - PADDING),
          PADDING
        );
        return pos;
      }
    });
    scrollLayers.add(verticalBar);
    scrollLayers.draw();

    verticalBar.on('dragmove', function () {
      // delta in %
      const availableHeight =
        stage.height() - PADDING * 2 - verticalBar.height();
      var delta = (verticalBar.y() - PADDING) / availableHeight;

      console.log('available height', availableHeight, frame.height, delta);
      layer.y(-frame.height * delta);
      layer.batchDraw();
    });

    const horizontalBar = new Konva.Rect({
      width: 100,
      height: 10,
      fill: 'grey',
      opacity: 0.8,
      x: PADDING,
      y: stage.height() - PADDING - 10,
      draggable: true,
      dragBoundFunc: function (pos) {
        pos.x = Math.max(
          Math.min(pos.x, stage.width() - this.width() - PADDING),
          PADDING
        );
        pos.y = stage.height() - PADDING - 10;

        return pos;
      }
    });
    scrollLayers.add(horizontalBar);
    scrollLayers.draw();

    horizontalBar.on('dragmove', () => {
      // delta in %
      const width = frame.width - stage.width();
      const availableWidth = stage.width() - PADDING * 2 - horizontalBar.width();
      const delta = (horizontalBar.x() - PADDING) / availableWidth;

      console.log('available width', availableWidth, frame.width - stage.width(), delta, -width * delta);

      layer.x(-width * delta);
      layer.batchDraw();
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

        this.layer.add(this.drawOval(item, point1, point2));
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

    if (style.contextSettings.opacity) {
      shape.opacity(style.contextSettings.opacity);
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
    const context = this.layer.getContext();
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

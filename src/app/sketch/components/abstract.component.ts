import Konva from 'konva';
import {StylesContainer} from '../styles/styles-container';
import {Group} from 'konva/types/Group';
import {StyleModel} from "../models/style/style.model";

export abstract class AbstractComponent {

  protected style: StyleModel;
  protected styles: StylesContainer = new StylesContainer();
  protected shape: Group;
  protected data: any;

  protected abstract render(): Group;

  constructor(payload: any) {
    this.data = payload;
    this.style = new StyleModel(payload.style);
  }

  public getData(): any {
    return this.data;
  }

  public getCss(): string {
    return this.styles.getCss();
  }

  public getShape(): Group {
    if(!this.shape) {
      this.shape = this.render();
    }
    return this.shape;
  }

  public applyStyles(style) {
    this.styles.applyStyles(style);

    return this.styles.getStyles();
  }

  protected createBoundingRect() {
    const group = new Konva.Group({
      x: this.data.frame.x,
      y: this.data.frame.y,
      width: this.data.frame.width,
      height: this.data.frame.height,
    });

    // group.add(this.drawRect());
    return group;
  }

  protected drawRect() {
    const rect = new Konva.Rect({
      width: this.data.frame.width,
      height: this.data.frame.height,
      // stroke: '#333',
      // strokeWidth: 1
    });

    // const style = this.data.style;
    //
    // if (style.borders.length) {
    //   for (const border of style.borders) {
    //     if (!border.isEnabled) {
    //       continue;
    //     }
    //
    //     rect.x(-border.thickness / 2);
    //     rect.y(-border.thickness / 2);
    //     rect.width(this.data.frame.width + border.thickness);
    //     rect.height(this.data.frame.height + border.thickness);
    //   }
    // }

    return rect;
  }

  private curvePoints(points) {

  }
}

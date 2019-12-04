import {Point} from './point.model';
import {Group} from 'konva/types/Group';
import {Shape, ShapeConfig} from 'konva/types/Shape';

export interface KonvaGroup extends Group {
  [propName: string]: any;
}

export interface KonvaShape extends Shape<ShapeConfig> {
  [propName: string]: any;
}

export interface KonvaStyle extends FillStyle, GradientStyle, BorderStyle, ShadowStyle, GraphicContextStyle, TextStyle {
  [propName: string]: any;
}

export interface FillStyle {
  fill?: string;
}

export interface GradientStyle {
  fillLinearGradientStartPoint?: Point;
  fillLinearGradientEndPoint?: Point;
  fillLinearGradientColorStops?: Array<string|number>;
  fillPriority?: string;
}

export interface BorderStyle {
  strokeWidth: number;
  stroke: string,
  hitStrokeWidth: number;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: Point
  shadowBlur: number;
}

export interface GraphicContextStyle {
  opacity: number;
}

export interface TextStyle extends TextAttributeStyle {
  verticalAlign: string;
  display: string;
}

export interface TextAttributeStyle {
  fontFamily: string,
  fontWeight: number;
  fontSize: string,
  lineHeight: string,
  textAlign: string,
  fontStyle: string,
  color: string
}

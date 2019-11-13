export class ColorControls {
  readonly _class: string = 'colorControls';
  isEnabled: boolean = false;
  brightness: number;
  contrast: number;
  hue: number;
  saturation: number;

  constructor({isEnabled, brightness, contrast, hue, saturation}) {
    this.isEnabled = !!isEnabled;
    this.brightness = brightness;
    this.contrast = contrast;
    this.hue = hue;
    this.saturation = saturation;
  }
}

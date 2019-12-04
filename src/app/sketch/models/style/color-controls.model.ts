export class ColorControls {
  readonly _class: string = 'colorControls';
  isEnabled: boolean = false;
  brightness: number;
  contrast: number;
  hue: number;
  saturation: number;

  constructor(payload: ColorControls) {
    this.isEnabled = Boolean(payload.isEnabled);
    this.brightness = payload.brightness;
    this.contrast = payload.contrast;
    this.hue = payload.hue;
    this.saturation = payload.saturation;
  }
}

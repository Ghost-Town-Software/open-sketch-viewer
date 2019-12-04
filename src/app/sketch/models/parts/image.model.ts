export class Image {
  readonly _class: string = 'MSJSONFileReference';
  readonly _ref_class: string = 'MSImageData';
  _ref: string;

  constructor(payload: Image) {
    this._ref = payload._ref;
  }
}

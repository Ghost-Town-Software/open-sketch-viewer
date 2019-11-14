export class Image {
  readonly _class: string = 'MSJSONFileReference';
  readonly _ref_class: string = 'MSImageData';
  _ref: string;

  constructor({_ref}) {
    this._ref = _ref;
  }
}

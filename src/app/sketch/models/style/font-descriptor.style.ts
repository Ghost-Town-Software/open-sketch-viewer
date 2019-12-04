export class FontDescriptor {
  readonly _class: string = 'fontDescriptor';
  attributes: {name: string, size: number};

  constructor(payload: FontDescriptor) {
    this.attributes = payload.attributes;
  }
}

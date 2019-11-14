export class FontDescriptor {
  readonly _class: string = 'fontDescriptor';
  attributes: {name: string, size: number};

  constructor({attributes}) {
    this.attributes = attributes;
  }
}

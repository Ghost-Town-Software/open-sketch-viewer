export class ParagraphStyle {
  readonly _class: string = 'paragraphStyle';
  alignment: number;
  maximumLineHeight: number;
  minimumLineHeight: number;
  allowsDefaultTighteningForTruncation: number;

  constructor({alignment, maximumLineHeight, minimumLineHeight, allowsDefaultTighteningForTruncation}) {
    this.alignment = alignment;
    this.maximumLineHeight = maximumLineHeight;
    this.minimumLineHeight = minimumLineHeight;
    this.allowsDefaultTighteningForTruncation = allowsDefaultTighteningForTruncation;
  }

  getAlignment() {
    switch(this.alignment) {
      case 2:
        return 'center';
      case 1:
        return 'right';
      case 0:
        return 'left';
      default:
        throw new Error('Invalid alignment: ' + this.alignment);
    }
  }
}

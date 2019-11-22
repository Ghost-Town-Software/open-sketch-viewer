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
    const alignments = ['left', 'right', 'center', 'start', 'end'];

    return alignments[this.alignment];
  }
}

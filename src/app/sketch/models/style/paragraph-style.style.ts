export class ParagraphStyle {
  readonly _class: string = 'paragraphStyle';
  alignment: number;
  maximumLineHeight: number;
  minimumLineHeight: number;
  allowsDefaultTighteningForTruncation: number;

  constructor(payload: ParagraphStyle) {
    this.alignment = payload.alignment;
    this.maximumLineHeight = payload.maximumLineHeight;
    this.minimumLineHeight = payload.minimumLineHeight;
    this.allowsDefaultTighteningForTruncation = payload.allowsDefaultTighteningForTruncation;
  }

  getAlignment(): string {
    const alignments = ['left', 'right', 'center', 'start', 'end'];

    return alignments[this.alignment];
  }
}

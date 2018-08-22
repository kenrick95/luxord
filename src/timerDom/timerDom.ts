class TimerDom {
  readonly domId: string;
  private canvasContext: CanvasRenderingContext2D;
  public canvasWidth: number;
  public canvasHeight: number;

  constructor({
    domId,
    canvasContext,
    canvasWidth,
    canvasHeight
  }: {
    domId: string;
    canvasContext: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;
  }) {
    this.domId = domId;
    this.canvasContext = canvasContext;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }
  // TODO: Hmm, should TimerDom have Timer? Maybe not, maybe just need to pass the "msLeft" from Timer to TimerDom
  render() {
    this.canvasContext.save();
    this.canvasContext.clearRect(0, 0, 100, 100);
    this.canvasContext.font = '48px serif';
    this.canvasContext.textAlign = 'center';
    this.canvasContext.textBaseline = 'middle';
    this.canvasContext.fillText('text', 50, 50);
    this.canvasContext.restore();
  }
}
export default TimerDom;

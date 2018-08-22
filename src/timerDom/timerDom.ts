type Data = {
  msLeft: number;
  isActive: boolean;
};

class TimerDom {
  readonly domId: string;
  private canvasContext: CanvasRenderingContext2D;
  public canvasWidth: number;
  public canvasHeight: number;
  private data: Data;
  private tickingMsLeft: number;
  private targetTimestamp: number;
  private onClick: Function;

  constructor({
    domId,
    canvasContext,
    canvasWidth,
    canvasHeight,
    onClick
  }: {
    domId: string;
    canvasContext: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;
    onClick: Function;
  }) {
    this.domId = domId;
    this.canvasContext = canvasContext;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.onClick = onClick;
    this.data = {
      msLeft: 0,
      isActive: false
    };
    this.tickingMsLeft = 0;
    this.targetTimestamp = 0;

    const el = document.getElementById(domId);
    if (el) {
      el.addEventListener('click', this.handleClick);
    }
  }

  handleClick = () => {
    this.onClick();
  };

  setData = ({ msLeft, isActive }: Data) => {
    if (this.data.msLeft !== msLeft) {
      console.log('msLeft changed:', this.domId, msLeft)
      this.targetTimestamp = Date.now() + msLeft;
      this.tick();
    }
    this.data = {
      msLeft,
      isActive
    };
    if (isActive) {
      this.tick();
    }
  };

  private tick = () => {
    this.tickingMsLeft = this.targetTimestamp - Date.now();
    if (this.tickingMsLeft > 0 && this.data.isActive) {
      requestAnimationFrame(this.tick);
    }
  };

  getText = () => {
    return Math.max(this.tickingMsLeft, 0) + '';
  };

  render() {
    this.canvasContext.save();
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canvasContext.font = '48px serif';
    this.canvasContext.textAlign = 'center';
    this.canvasContext.textBaseline = 'middle';
    this.canvasContext.fillText(
      this.getText(),
      this.canvasWidth / 2,
      this.canvasHeight / 2
    );
    this.canvasContext.restore();
  }
}
export default TimerDom;

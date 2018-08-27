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

    const el = document.getElementById(domId);
    if (el) {
      el.addEventListener('click', this.handleClick);
    }
  }

  handleClick = () => {
    this.onClick();
  };

  setData = ({ msLeft, isActive }: Data) => {
    this.data = {
      msLeft,
      isActive
    };
  };

  private getText = () => {
    const msLeft = Math.max(this.data.msLeft, 0);
    const seconds = Math.floor(msLeft / 1000);
    const minutes = Math.floor(seconds / 60);

    return `${this.pad(minutes)}:${this.pad(seconds % 60)}.${Math.floor(
      (msLeft % 1000) / 100
    )}`;
  };

  private pad = (number: number) => {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  };

  render() {
    this.canvasContext.save();
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canvasContext.font = '13rem monospace';
    this.canvasContext.fillStyle = 'white';
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

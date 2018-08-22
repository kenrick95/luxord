class Timer {
  public isActive: boolean = false;
  public msLeft: number = 0;
  private timeoutId: null | number;
  private timeStarted: null | number;
  private endCallback: Function;
  constructor(endCallback: Function) {
    this.endCallback = endCallback;
    this.timeoutId = null;
    this.timeStarted = null;
  }

  start = () => {
    this.isActive = true;
    this.timeStarted = Date.now();
    this.timeoutId = setTimeout(this.end, this.msLeft);
  }
  pause = () => {
    this.isActive = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.timeStarted) {
      this.msLeft -= Date.now() - this.timeStarted;
      if (this.msLeft < 0) {
        this.msLeft = 0;
        this.end();
      }
    }
  }
  end = () => {
    this.isActive = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.msLeft = 0;
    this.endCallback();
  }
}
export default Timer;

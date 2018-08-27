import Timer from './timer';

export enum TIMER_ID {
  ONE = 0,
  TWO = 1,
  NONE = 2
}

class SwitchTimer {
  activeTimerId: TIMER_ID = TIMER_ID.NONE;
  timers: Timer[];
  private timerAmountInMs: number;

  constructor(timerAmountInMs: number) {
    this.timerAmountInMs = timerAmountInMs;
    this.timers = [
      new Timer(this.endCallback.bind(this, TIMER_ID.ONE)),
      new Timer(this.endCallback.bind(this, TIMER_ID.TWO))
    ];
    this.reset();
  }
  private getInactiveTimerId = () => {
    if (this.activeTimerId === TIMER_ID.NONE) {
      return TIMER_ID.NONE;
    }
    return this.activeTimerId === TIMER_ID.ONE ? TIMER_ID.TWO : TIMER_ID.ONE;
  };
  private endCallback = (timerId: number) => {
    console.log('Timer ended:', timerId);
    alert(`Time's up for player ${timerId + 1}`)
    this.reset();
  };

  reset = () => {
    for (const timer of this.timers) {
      timer.reset();
      timer.msLeft = this.timerAmountInMs;
    }
    this.activeTimerId = TIMER_ID.NONE;
  };
  start = () => {
    const inactiveTimerId = this.getInactiveTimerId();
    if (inactiveTimerId === TIMER_ID.NONE) {
      return;
    }
    this.timers[inactiveTimerId].pause();
    if (this.activeTimerId === TIMER_ID.NONE) {
      return;
    }
    this.timers[this.activeTimerId].start();
  };
  switch = () => {
    this.activeTimerId = this.getInactiveTimerId();
    this.start();
  };
}
export default SwitchTimer;

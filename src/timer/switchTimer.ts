import Timer from './timer';

enum TIMER_ID {
  ONE = 0,
  TWO = 1
}

class SwitchTimer {
  activeTimerId: TIMER_ID = TIMER_ID.ONE;
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
    return this.activeTimerId === TIMER_ID.ONE ? TIMER_ID.TWO : TIMER_ID.ONE;
  };
  private endCallback = (timerId: number) => {
    console.log('Do something', timerId);
  };

  reset = () => {
    for (const timer of this.timers) {
      timer.setMsLeft(this.timerAmountInMs);
    }
  };
  start = () => {
    const inactiveTimerId = this.getInactiveTimerId();
    this.timers[inactiveTimerId].pause();
    this.timers[this.activeTimerId].start();
  };
  switch = () => {
    this.activeTimerId = this.getInactiveTimerId();
    this.start();
  };
}
export default SwitchTimer;

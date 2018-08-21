import SwitchTimer from './timer/switchTimer';

import './style.css';

class Main {
  switchTimer: SwitchTimer;
  constructor() {
    this.switchTimer = new SwitchTimer(10 * 1000);
  }
  start() {
    this.switchTimer.start();
  }
}

const main = new Main();
main.start();

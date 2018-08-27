import SwitchTimer from './timer/switchTimer';
import TimerDom from './timerDom/timerDom';
import ResizeHandler from './resizeHandler';

import './style.css';

const TIMER_AMOUNT_IN_MS = 10 * 60 * 1000;

class Main {
  switchTimer: SwitchTimer;
  timerDoms: (null | TimerDom)[];
  resizeHandler: ResizeHandler;

  constructor() { 
    this.switchTimer = new SwitchTimer(TIMER_AMOUNT_IN_MS);

    this.timerDoms = [
      this.createTimerDom('timer-1'),
      this.createTimerDom('timer-2')
    ];
    this.resizeHandler = new ResizeHandler();
    this.resizeHandler.addCallback(this.handleResized);
  }
  private createTimerDom(id: string) {
    const el = document.getElementById(id);
    if (el && el instanceof HTMLCanvasElement) {
      const context = el.getContext('2d');
      if (context) {
        return new TimerDom({
          domId: id,
          canvasContext: context,
          canvasWidth: el.width,
          canvasHeight: el.height,
          onClick: this.switch.bind(this, id)
        });
      }
    }
    return null;
  }

  start() {
    this.switchTimer.start();
    this.handleResized();
    this.render();
  }

  switch = (id: string) => {
    const timerDomIndex = this.timerDoms.findIndex(
      item => !!item && item.domId === id
    );
    if (this.switchTimer.activeTimerId === timerDomIndex) {
      this.switchTimer.switch();
      this.render();
    }
    
  }

  render = () => {
    for (let i = 0; i < 2; i++) {
      const timerDom = this.timerDoms[i];
      const timer = this.switchTimer.timers[i];
      if (timerDom && timer) {
        timerDom.setData({
          isActive: timer.isActive,
          msLeft: timer.msLeft
        });
        timerDom.render();
      }
    }
    requestAnimationFrame(this.render);
  };

  handleResized = () => {
    for (const timerDom of this.timerDoms) {
      if (timerDom) {
        const el = document.getElementById(timerDom.domId);
        if (el && el instanceof HTMLCanvasElement) {
          const parent = el.parentElement;
          if (parent) {
            el.width = parent.clientWidth;
            el.height = parent.clientHeight;
            timerDom.canvasWidth = el.width;
            timerDom.canvasHeight = el.height;
          }
        }
      }
    }
    this.render();
  };
}

const main = new Main();
main.start();

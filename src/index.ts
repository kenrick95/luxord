import SwitchTimer from './timer/switchTimer';
import TimerDom from './timerDom/timerDom';
import ResizeHandler from './resizeHandler';

import './style.css';

class Main {
  switchTimer: SwitchTimer;
  timerDoms: (null | TimerDom)[];
  resizeHandler: ResizeHandler;

  constructor() {
    this.switchTimer = new SwitchTimer(10 * 1000);

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
          canvasHeight: el.height
        });
      }
    }
    return null;
  }

  start() {
    this.switchTimer.start();
    this.render();
  }
  render = () => {
    for (const timerDom of this.timerDoms) {
      if (timerDom) {
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
          }
        }
      }
    }
    this.render();
  };
}

const main = new Main();
main.start();

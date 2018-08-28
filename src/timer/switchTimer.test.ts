import { advanceBy, advanceTo, clear } from 'jest-date-mock';
import SwitchTimer, { TIMER_ID } from './switchTimer';

jest.useFakeTimers();

let switchTimer: SwitchTimer;
const timerAmount = 1000;
const now = Date.now();
beforeEach(() => {
  advanceTo(now);
});
afterEach(() => {
  clear();
});
describe('switchTimer initial state', () => {
  const switchTimer = new SwitchTimer(timerAmount);
  test('Initially, none should be active', () => {
    expect(switchTimer.activeTimerId).toBe(TIMER_ID.NONE);
  });
});
describe('switchTimer Player 1 starts', () => {
  beforeEach(() => {
    switchTimer = new SwitchTimer(timerAmount);
    switchTimer.activeTimerId = TIMER_ID.ONE;
    switchTimer.start();
  });
  test('Timer Player 1 should be active', () => {
    expect(switchTimer.timers[TIMER_ID.ONE].isActive).toBe(true);
  });
  test('Timer Player 1 msLeft should be 1000ms', () => {
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(1000);
  });
  test('Timer Player 2 should be not active', () => {
    expect(switchTimer.timers[TIMER_ID.TWO].isActive).toBe(false);
  });
  test('Timer Player 2 msLeft should be 1000ms', () => {
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(1000);
  });
});
describe('switchTimer Player 1 starts, then after 500 ms', () => {
  beforeEach(() => {
    switchTimer = new SwitchTimer(timerAmount);
    switchTimer.activeTimerId = TIMER_ID.ONE;
    switchTimer.start();
    advanceTo(now + 500);
  });
  afterEach(() => {
    advanceTo(now);
  });
  jest.advanceTimersByTime(500);

  test('Timer Player 1 should be active', () => {
    expect(switchTimer.timers[TIMER_ID.ONE].isActive).toBe(true);
  });
  test('Timer Player 1 msLeft should be 500ms', () => {
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(500);
  });
  test('Timer Player 2 should be not active', () => {
    expect(switchTimer.timers[TIMER_ID.TWO].isActive).toBe(false);
  });
  test('Timer Player 2 msLeft should be 1000ms', () => {
    expect(switchTimer.timers[TIMER_ID.TWO].msLeft).toBe(1000);
  });
});

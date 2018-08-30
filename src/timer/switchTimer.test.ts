import { advanceBy, advanceTo, clear } from 'jest-date-mock';
import SwitchTimer, { TIMER_ID } from './switchTimer';

const alertSpy = jest
  .spyOn(window, 'alert')
  .mockImplementation((...args) => console.info.apply(null, args));

let switchTimer: SwitchTimer;
const timerAmount = 1000;
const now = Date.now();
beforeEach(() => {
  jest.useFakeTimers();
  advanceTo(now);
});
afterEach(() => {
  jest.clearAllTimers();
  alertSpy.mockClear();
  clear();
});
test('switchTimer initial state', () => {
  const switchTimer = new SwitchTimer(timerAmount);
  expect(switchTimer.activeTimerId).toBe(TIMER_ID.NONE);
});
describe('switchTimer Player 1 starts', () => {
  test('initial state', () => {
    switchTimer = new SwitchTimer(timerAmount);
    switchTimer.activeTimerId = TIMER_ID.ONE;
    switchTimer.start();
    expect(switchTimer.timers[TIMER_ID.ONE].isActive).toBe(true);
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(1000);
    expect(switchTimer.timers[TIMER_ID.TWO].isActive).toBe(false);
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(1000);
    expect(alertSpy).not.toBeCalled();
  });
  test('after 400 ms', () => {
    switchTimer = new SwitchTimer(timerAmount);
    switchTimer.activeTimerId = TIMER_ID.ONE;
    switchTimer.start();
    advanceTo(now + 400);
    jest.advanceTimersByTime(400);

    expect(switchTimer.timers[TIMER_ID.ONE].isActive).toBe(true);
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(600);
    expect(switchTimer.timers[TIMER_ID.TWO].isActive).toBe(false);
    expect(switchTimer.timers[TIMER_ID.TWO].msLeft).toBe(1000);
    expect(alertSpy).not.toBeCalled();
  });

  test('after 400 ms, switch', () => {
    switchTimer = new SwitchTimer(timerAmount);
    switchTimer.activeTimerId = TIMER_ID.ONE;
    switchTimer.start();
    advanceTo(now + 400);
    jest.advanceTimersByTime(400);
    switchTimer.switch();

    expect(switchTimer.timers[TIMER_ID.ONE].isActive).toBe(false);
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(600);
    expect(switchTimer.timers[TIMER_ID.TWO].isActive).toBe(true);
    expect(switchTimer.timers[TIMER_ID.TWO].msLeft).toBe(1000);
    expect(alertSpy).not.toBeCalled();
  });

  test('after 400 ms, switch, and wait for 200 ms', () => {
    switchTimer = new SwitchTimer(timerAmount);
    switchTimer.activeTimerId = TIMER_ID.ONE;
    switchTimer.start();
    advanceTo(now + 400);
    jest.advanceTimersByTime(400);
    switchTimer.switch();
    advanceTo(now + 600);
    jest.advanceTimersByTime(200);

    expect(switchTimer.timers[TIMER_ID.ONE].isActive).toBe(false);
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(600);
    expect(switchTimer.timers[TIMER_ID.TWO].isActive).toBe(true);
    expect(switchTimer.timers[TIMER_ID.TWO].msLeft).toBe(800);
    expect(alertSpy).not.toBeCalled();
  });

  test('after 400 ms, switch, wait for 200 ms, and switch', () => {
    switchTimer = new SwitchTimer(timerAmount);
    switchTimer.activeTimerId = TIMER_ID.ONE;
    switchTimer.start();
    advanceTo(now + 400);
    jest.advanceTimersByTime(400);
    switchTimer.switch();
    advanceTo(now + 600);
    jest.advanceTimersByTime(200);
    switchTimer.switch();

    expect(switchTimer.timers[TIMER_ID.ONE].isActive).toBe(true);
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(600);
    expect(switchTimer.timers[TIMER_ID.TWO].isActive).toBe(false);
    expect(switchTimer.timers[TIMER_ID.TWO].msLeft).toBe(800);
    expect(alertSpy).not.toBeCalled();
  });

  test('after 400 ms, switch, wait for 200 ms, switch, and wait 600 ms', () => {
    switchTimer = new SwitchTimer(timerAmount);
    switchTimer.activeTimerId = TIMER_ID.ONE;
    switchTimer.start();
    advanceTo(now + 400);
    jest.advanceTimersByTime(400);
    switchTimer.switch();
    advanceTo(now + 600);
    jest.advanceTimersByTime(200);
    switchTimer.switch();
    advanceTo(now + 1200);
    jest.advanceTimersByTime(600);

    expect(switchTimer.timers[TIMER_ID.ONE].isActive).toBe(false);
    expect(switchTimer.timers[TIMER_ID.ONE].msLeft).toBe(1000);
    expect(switchTimer.timers[TIMER_ID.TWO].isActive).toBe(false);
    expect(switchTimer.timers[TIMER_ID.TWO].msLeft).toBe(1000);
    expect(alertSpy).toBeCalled();
  });
});

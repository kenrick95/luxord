/**
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */
class ResizeHandler {
  private callbacks: Function[];
  private running: boolean;
  constructor() {
    this.callbacks = [];
    this.running = false;
    window.addEventListener('resize', this.handleResized);
  }
  addCallback = (callback: Function) => {
    this.callbacks.push(callback);
  };
  handleResized = () => {
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.runCallbacks);
    }
  };
  runCallbacks = () => {
    for (const callback of this.callbacks) {
      callback();
    }
    this.running = false;
  };
}
export default ResizeHandler;

import game from '../../game.setup.js';

const canvas = document.querySelector('canvas');

class CanvasComponent {
  constructor(width, height, x, y, color = 'black') {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;

    this.ctx = canvas.getContext('2d');
    this.build();
  }

  get middle() {
    return this.x + this.width / 2;
  }

  build() {
    const { x, y, width, height, rotation, color } = this;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  clear(pad = true) {
    const { x, y, width, height } = this;
    this.ctx.clearRect(
      Math.floor(x),
      Math.floor(y),
      pad ? width + 2 : width,
      pad ? height + 2 : height
    );
  }

  setAnimation(cb, intervalTime) {
    this.animationCallback = cb;
    this.intervalTime = intervalTime;
    this.startAnimation();
  }

  startAnimation() {
    this.interval = setInterval(() => {
      const { x, y, width, height } = this.animationCallback(
        this.x,
        this.y,
        this.width,
        this.height
      );

      this.clear();

      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.build();
    }, this.intervalTime);
  }

  rebuild() {
    this.stopAnimation();
    this.clear();
    this.build();
  }

  bounce(
    distance,
    frameRate,
    pushDownwardOnTouch = false,
    distanceIncreaseFactor = 0,
    maxBounceDistance = game.maxTargetFrameDistance,
    onUpdate = null
  ) {
    this.isMovingRight = true;
    this.bounceDistance = distance;

    this.setAnimation((x, y, width, height) => {
      let hasTouchedEdge = false;
      if (this.isMovingRight && x >= canvas.height - this.width) {
        hasTouchedEdge = true;
        this.isMovingRight = false;
      } else if (!this.isMovingRight && x <= 0) {
        hasTouchedEdge = true;
        this.isMovingRight = true;
      }
      const shouldPushForward = hasTouchedEdge && pushDownwardOnTouch;
      if (shouldPushForward && this.bounceDistance < maxBounceDistance) {
        this.bounceDistance += distanceIncreaseFactor;
      }

      if (onUpdate) onUpdate();

      return {
        x: this.isMovingRight ? x + this.bounceDistance : x - this.bounceDistance,
        y: shouldPushForward ? y + 16 : y,
        width,
        height,
      };
    }, frameRate);
  }

  get isOutsideYRange() {
    const topYposition = this.y;
    const bottomYposition = this.y + this.height;

    return bottomYposition < 0 || topYposition > canvas.height;
  }

  explode() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;
    this.#buildExplosions(0);
  }

  #buildExplosions(copyCount = 0) {
    copyCount++;
    if (copyCount < 4) {
      const copy = new CanvasComponent(this.width, this.height, this.x, this.y, this.color);
      copy.#buildExplosions(copyCount);
    }

    const horizontalDirection = copyCount === 1 || copyCount === 3 ? 'right' : 'left';
    const verticalDirection = copyCount === 1 || copyCount === 2 ? 'up' : 'down';

    this.height = this.height * 1.5;
    this.width = this.width * 1.5;

    this.rebuild();

    this.setAnimation((x, y, width, height) => {
      if (this.isOutsideYRange) {
        this.stopAnimation();
      }

      const adjustedWidth = width >= height ? width - 1 : width;
      const adjustedHeight = height >= width ? height - 1 : height;

      return {
        x: horizontalDirection === 'left' ? x - 1 : x + 1,
        y: verticalDirection === 'up' ? y - 1 : y + 1,
        width: width > 2 ? adjustedWidth : width,
        height: height > 2 ? adjustedHeight : height,
      };
    }, 10);
  }

  stopAnimation() {
    clearInterval(this.interval);
  }
}

export default CanvasComponent;

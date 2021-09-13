import { targets, platform } from '../draw/index.js';

export const isIntersecting = (target, x, y, hitboxBuffer = 5) => {
  const targetMinX = target.x - hitboxBuffer;
  const targetMaxX = target.x + target.width + hitboxBuffer;
  const targetMinY = target.y - hitboxBuffer;
  const targetMaxY = target.y + target.height + hitboxBuffer;

  return x >= targetMinX && x <= targetMaxX && y >= targetMinY && y <= targetMaxY;
};

export const checkIntersections = () => {
  setInterval(() => {
    targets.some((target) => {
      if (isIntersecting(target, platform.x, platform.y, 0) && !target.isDestroyed) {
        platform.explode();
        targets.forEach((target) => {
          target.stopAnimation();
          setTimeout(() => target.explode(), 750);
        });
      }
    });
  }, 10);
};

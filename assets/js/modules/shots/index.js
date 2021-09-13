import game from '../../game.setup.js';
import { CanvasComponent } from '../canvas/index.js';
import { targets, platform, drawFireworks } from '../draw/index.js';
import { isIntersecting } from '../hit-detection/index.js';

const shotAnimation = (x, y, width, height) => {
  if (shot.isOutsideYRange) {
    game.shotsOnScreen--;
    shot.clear();
    shot.stopAnimation();
  }

  targets.forEach((target) => {
    if (isIntersecting(target, x, y) && !target.isDestroyed) {
      target.explode();
      if (platform.bounceDistance < game.maxPlatformFrameDistance) platform.bounceDistance++;
    }
  });

  if (targets.every((target) => target.isDestroyed)) {
    shot.clear();
    platform.stopAnimation();
    platform.clear();
    drawFireworks();
  }

  return {
    x,
    y: y - 1,
    width,
    height,
  };
};

export const fireShot = () => {
  if (game.isOverShotLimit) return;
  const shot = new CanvasComponent(2, 15, platform.middle, 275, game.color);
  game.shotsOnScreen++;
  shot.setAnimation(shotAnimation, 1);
};

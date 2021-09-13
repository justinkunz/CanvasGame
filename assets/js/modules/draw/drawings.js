import game from '../../game.setup.js';
import { COLORS, SCORE_TEXT } from '../../constants/index.js';
import { CanvasText, CanvasComponent } from '../canvas/index.js';

export const drawTargets = () => {
  return Array.apply(null, Array(game.targetCount)).map((e, i) => {
    const startingPointX = Math.floor(Math.random() * canvas.width);
    const initialSpeed = Math.min(
      Math.random() * game.maxTargetFrameDistance + 1,
      game.maxTargetFrameDistance
    );

    const target = new CanvasComponent(10, 8, startingPointX, i * 16, game.color);
    target.bounce(initialSpeed, 15, true, 1, game.maxTargetFrameDistance);

    return target;
  });
};

export const drawPlatform = () => {
  const platform = new CanvasComponent(40, 8, 0, 292, COLORS.PRIMARY);
  platform.bounce(1, 10);
  return platform;
};

export const drawFireworks = () => {
  if (game.isCompleted) return;
  game.isCompleted = true;
  setTimeout(() => {
    Array.apply(null, Array(12)).map(() => {
      const outerPadding = 100;
      const x = Math.floor(Math.random() * (canvas.width - outerPadding)) + outerPadding / 2;
      const y = Math.floor(Math.random() * (canvas.height - outerPadding)) + outerPadding / 2;
      const timeout = Math.floor(Math.random() * 1500) + 750;
      setTimeout(() => {
        const fw = new CanvasComponent(10, 10, x, y, game.color);
        fw.explode();
      }, timeout);
    });
  }, 500);
  setTimeout(() => {
    new CanvasText(SCORE_TEXT(game.score), 24);
  }, 4000);
};

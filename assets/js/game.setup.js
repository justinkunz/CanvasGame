import { colorSchemeRotator } from './utils/index.js';

const theme = colorSchemeRotator();

const game = {
  isCompleted: false,
  shotsOnScreenLimit: 3,
  totalShotsFired: 0,
  targetCount: 12,
  maxTargetFrameDistance: 5,
  maxPlatformFrameDistance: 4,
  set shotsOnScreen(updatedShotCount) {
    if (updatedShotCount > this._shotsOnScreen) {
      this.totalShotsFired++;
    }
    this._shotsOnScreen = updatedShotCount;
  },
  get shotsOnScreen() {
    return this._shotsOnScreen;
  },
  get isOverShotLimit() {
    return this.shotsOnScreen >= this.shotsOnScreenLimit;
  },
  get score() {
    return Math.max(20, 100 - this.totalShotsFired) * 50;
  },
  get color() {
    return theme.next().value;
  },
  _shotsOnScreen: 0,
};

export default game;

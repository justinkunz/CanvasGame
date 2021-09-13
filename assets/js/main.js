import { checkIntersections } from './modules/hit-detection/index.js';
import { fireShot } from './modules/shots/index.js';

document.addEventListener('keypress', fireShot);

checkIntersections();

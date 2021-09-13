import { COLORS } from '../constants/index.js';

export function* colorSchemeRotator() {
  let index = 0;
  const colorScheme = Object.values(COLORS.PRIMARY_SCHEME);
  while (true) {
    if (index >= colorScheme.length) index = 0;
    yield colorScheme[index];
    index++;
  }
}

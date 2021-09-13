export const COLORS = {
  BG: '#333333',
  PRIMARY_SCHEME: {
    DARKER: '#6700ff',
    DARK: '#8a01ff',
    LIGHT: '#b701fe',
    LIGHTER: '#d900ff',
    LIGHTEST: '#f501fe',
  },
  get PRIMARY() {
    return this.PRIMARY_SCHEME.LIGHTEST;
  },
};

export const SCORE_TEXT = (score) => `Score: ${score}`;

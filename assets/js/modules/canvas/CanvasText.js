const canvas = document.querySelector('canvas');

class CanvasText {
  constructor(text, fontSize, color = 'white') {
    this.text = text;
    this.fontSize = fontSize;
    this.ctx = canvas.getContext('2d');
    this.textWidth = this.ctx.measureText(this.text).width;

    this.build();
  }

  build() {
    this.ctx.font = `${this.fontSize}px sans-serif`;
    this.textWidth = this.ctx.measureText(this.text).width;
    this.ctx.fillText(this.text, canvas.width / 2 - this.textWidth / 2, 60);
  }
}

export default CanvasText;

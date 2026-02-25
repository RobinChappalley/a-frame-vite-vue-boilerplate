import { reactive } from 'vue';

export const store = reactive({
  score: 0,
  lives: 3,
  isGameOver: false,
  isPlaying: false,

  reset() {
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
  },

  startGame() {
    this.reset();
    this.isPlaying = true;
  },

  addScore(points) {
    if (this.isGameOver) return;
    this.score += points;
  },

  removeLife() {
    if (this.isGameOver || !this.isPlaying) return;
    this.lives--;
    if (this.lives <= 0) {
      this.isGameOver = true;
      this.isPlaying = false;
    }
  }
});


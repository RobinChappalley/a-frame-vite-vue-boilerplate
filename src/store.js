import { reactive } from 'vue';

export const store = reactive({
  score: 0,
  lives: 3,
  level: 1,
  difficulty: 1,
  combo: 0,
  coins: 0,
  isGameOver: false,
  isPlaying: false,

  reset() {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.difficulty = 1;
    this.combo = 0;
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
    this.combo = 0; // Réinitialiser le combo quand on prend un coup/rate
    if (this.lives <= 0) {
      this.isGameOver = true;
      this.isPlaying = false;
    }
  },

  addLife() {
    if (this.isGameOver || !this.isPlaying) return;
    if (this.lives < 3) {
      this.lives++;
      return true; // Vie rajoutée avec succès
    }
    return false; // Déjà max vies
  },

  addCoin(amount = 1) {
    if (this.isGameOver || !this.isPlaying) return;
    this.coins += amount;
  },

  incrementCombo() {
    this.combo++;
  },

  resetCombo() {
    this.combo = 0;
  }
});


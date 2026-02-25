// src/store.js
import { reactive } from 'vue';

export const store = reactive({
  score: 0,
  lives: 3,
  isGameOver: false,

  reset() {
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
  },

  addScore(points = 10) {
    if (this.isGameOver) return;
    this.score += points;
  },

  removeLife() {
    if (this.isGameOver) return;
    this.lives--;
    if (this.lives <= 0) {
      this.isGameOver = true;
      // Ici on pourra déclencher un son de défaite plus tard
    }
  }
});

import { reactive } from 'vue';

export const store = reactive({
  score: 0,
  lives: 3,
  level: 1,
  difficulty: 1,
  combo: 0,
  bestCombo: 0,
  sessionCoins: 0,
  coins: 0,
  bestScore: 0,
  currentWorld: 'void',
  gameAngle: 0, // Orientation du jeu en fonction du monde choisi
  unlockedWorlds: ['volcano'], // Liste des mondes débloqués
  isGameOver: false,
  isPlaying: false,
  isSelectingWorld: true,
  showCoinError: false,

  // Définition des mondes (pour faciliter l'évolution plus tard)
  worlds: {
    void: { name: 'The Void', preset: 'none', groundColor: '#111111', rockColor: '#333333', skyColor: 'color' },
    volcano: { name: 'Volcano', preset: 'volcano', groundColor: '#440000', rockColor: '#aa3300', skyColor: 'atmosphere' },
    contact: { name: 'Contact', preset: 'contact', groundColor: '#1c0f33', rockColor: '#5319a1', skyColor: 'atmosphere' },
    egypt: { name: 'Egypt', preset: 'egypt', groundColor: '#d1b26f', rockColor: '#e0c17a', skyColor: 'atmosphere' },
    checkerboard: { name: 'Checkerboard', preset: 'checkerboard', groundColor: '#cccccc', rockColor: '#555555', skyColor: 'atmosphere' },
    forest: { name: 'Forest', preset: 'forest', groundColor: '#0d3b14', rockColor: '#5c4033', skyColor: 'atmosphere' },
    goaland: { name: 'Goaland', preset: 'goaland', groundColor: '#ffd700', rockColor: '#00aaff', skyColor: 'atmosphere' },
    yavapai: { name: 'Yavapai', preset: 'yavapai', groundColor: '#bc5b3e', rockColor: '#8a3324', skyColor: 'atmosphere' },
    goldmine: { name: 'Goldmine', preset: 'goldmine', groundColor: '#30261b', rockColor: '#b89947', skyColor: 'atmosphere' },
    threetowers: { name: 'Three Towers', preset: 'threetowers', groundColor: '#3d4040', rockColor: '#5a5d5d', skyColor: 'atmosphere' },
    poison: { name: 'Poison', preset: 'poison', groundColor: '#1c4a16', rockColor: '#3b912b', skyColor: 'atmosphere' },
    arches: { name: 'Arches', preset: 'arches', groundColor: '#8a3c26', rockColor: '#a64a30', skyColor: 'atmosphere' },
    tron: { name: 'Tron', preset: 'tron', groundColor: '#002222', rockColor: '#00ffff', skyColor: 'atmosphere' },
    japan: { name: 'Japan', preset: 'japan', groundColor: '#384d33', rockColor: '#ffb3c6', skyColor: 'atmosphere' },
    dream: { name: 'Dream', preset: 'dream', groundColor: '#ae8bba', rockColor: '#dca3ff', skyColor: 'atmosphere' },
    starry: { name: 'Starry', preset: 'starry', groundColor: '#0c1221', rockColor: '#4a5b7d', skyColor: 'atmosphere' },
    osiris: { name: 'Osiris', preset: 'osiris', groundColor: '#201833', rockColor: '#309b8c', skyColor: 'atmosphere' },
    moon: { name: 'Moon', preset: 'moon', groundColor: '#444444', rockColor: '#888888', skyColor: 'atmosphere' },
  },

  reset() {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.difficulty = 1;
    this.combo = 0;
    this.bestCombo = 0;
    this.sessionCoins = 0;
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
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
      }
      
      // Bonus de pièces à la fin de la partie : sessionCoins * (bestCombo / 100)
      const bonusCoins = Math.round(this.sessionCoins * (this.bestCombo / 100));
      this.coins += bonusCoins;
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
    this.sessionCoins += amount;
  },

  removeCoin(amount = 1) {
    if (this.coins >= amount) {
      this.coins -= amount;
    }
  },

  incrementCombo() {
    this.combo++;
    if (this.combo > this.bestCombo) {
      this.bestCombo = this.combo;
    }
  },

  resetCombo() {
    this.combo = 0;
  },

  nomoney() {
    this.showCoinError = true;
    
    // Joue le son d'erreur d'achat
    const soundEl = document.querySelector('#sound-no-money');
    if (soundEl && soundEl.components.sound) {
      soundEl.components.sound.stopSound();
      soundEl.components.sound.playSound();
    }
    
    setTimeout(() => {
      this.showCoinError = false;
    }, 2500);
  }
});


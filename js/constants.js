// Constants
export const MIN_SCORE = 12;
export const MAX_SCORE = 999;
export const DOUBLE_SIX = 12;
export const DICE_SIX = 6;

// Dice Sounds
const diceSounds = [];
for (let i = 1; i <= 4; i++) {
  diceSounds[i] = new Audio(`./assets/audio/${i}.wav`);
}
export { diceSounds };

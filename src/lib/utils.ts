export function generateRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export const getRandomAnimationCurve = () => {
  const randomX2 = `${Math.random() * 5}%`;
  const randomY2 = `${Math.random() * 50 + 50}%`;

  return `cubic-bezier(100%, 100%, ${randomX2}, ${randomY2})`;
};

export const getRandomAngle = () => {
  // Decide on whether the reaction is facing left or right.
  const direction = Math.random() < 0.5 ? 1 : -1;
  // Decide the starting angle of the reaction.
  const startingAngle = Math.floor(Math.random() * 90);

  return direction * startingAngle;
};

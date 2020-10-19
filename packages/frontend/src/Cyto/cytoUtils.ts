export const changeScore = (inputIds: string[]): number => {
  let score = 0;

  inputIds.forEach((id) =>
    id.split('').forEach((c) => {
      score += c.charCodeAt(0);
    })
  );

  return score;
};

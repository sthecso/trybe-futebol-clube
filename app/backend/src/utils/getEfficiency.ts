const getEfficiency = (
  totalPoints: number,
  totalMatches: number,
): number => {
  let result: number | string = ((totalPoints / (totalMatches * 3)) * 100).toFixed(2);

  result = Number(result);

  return result;
};

export default getEfficiency;

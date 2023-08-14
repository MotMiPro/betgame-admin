export function getFixedNumber(num, fixed = 4) {
  if (num === 0) return 0;
  const parseNumToString = num.toString();
  const newNum = parseNumToString.slice(
    0,
    parseNumToString.indexOf(".") + fixed
  );
  return Number(newNum);
}

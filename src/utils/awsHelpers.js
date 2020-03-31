export const getSecondPartOfString = str => {
  return str.split(':')[1];
};

export const dollarToCents = price => {
  return (price * 100).toFixed(0);
};

export const centsToDollars = price => {
  return (price / 100).toFixed(2);
};

const convertNumberToText = (number) => {
  const numStr = number.toString();
  const digit = numStr.length;

  if (digit === 5) {
    return `${numStr.substring(0, 1)}만원`;
  }

  if (digit === 6) {
    return `${numStr.substring(0, 2)}만원`;
  }

  if (digit === 7) {
    return `${numStr[0]}백만원`;
  }

  if (digit === 8) {
    return `${numStr[0]}천만원`;
  }
  if (digit >= 9 && digit <= 12) {
    const hundMill = numStr.substring(0, digit - 8);
    const tenThous = numStr.substring(digit - 8, digit - 7);
    return `${hundMill}억 ${tenThous}천만원`;
  }

  if (digit >= 13 && digit <= 16) {
    const trillion = numStr.substring(0, digit - 12);
    const hundMill = numStr.substring(digit - 12, digit - 8);
    return `${trillion}조 ${hundMill}억원`;
  }
};

export default convertNumberToText;

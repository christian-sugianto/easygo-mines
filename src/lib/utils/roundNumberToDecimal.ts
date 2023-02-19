const roundNumberToDecimal = (num: number, decimalPlace?: number): number => {
    if (decimalPlace) {
      return +num.toFixed(decimalPlace);
    }
    return +num.toFixed(2);
  };
  
  export default roundNumberToDecimal;
  
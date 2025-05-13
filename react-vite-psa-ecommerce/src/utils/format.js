// 숫자를 ₩1,342,000 형식으로 포맷
export const formatCurrency = (amount) => {
    const number = Math.floor(amount);
    return number.toLocaleString('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  
  // 숫자를 1,342,000원 형식으로 포맷
export const formatCurrencyWithWon = (amount) => {
    const number = Math.floor(amount);
    return number.toLocaleString('ko-KR') + ' 원';
  };
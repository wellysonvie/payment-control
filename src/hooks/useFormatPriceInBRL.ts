const useFormatPriceInBRL = (price: number): string => {
  return price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });
};

export default useFormatPriceInBRL;

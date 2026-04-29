export const formatIntegerText = (value: string | number): string => {
  const numbers = Number(String(value).replace(/\D/g, ""));

  if (!numbers) return "0";

  return numbers.toLocaleString("pt-BR", {
    maximumFractionDigits: 0,
  });
};
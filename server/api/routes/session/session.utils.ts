export const isValidYear = (year: number) => {
  const currentYear = new Date().getFullYear();
  return year <= currentYear && year >= 2023;
};

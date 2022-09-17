export function convertMinutesToHourString(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;
  
// padStart Adiciona um zero no inicio caso ele não cumpra a regra de "2" caracteres
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

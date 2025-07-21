const getFirstThursdayAfter = (date) => {
  const d = new Date(date);
  // 0 = Sun … 4 = Thu
  const daysUntilThu = (4 - d.getDay() + 7) % 7 || 7; // never zero
  d.setDate(d.getDate() + daysUntilThu);
  d.setHours(0, 0, 0, 0);                 // midnight
  return d;
};

const addWeeks = (date, weeks) => {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
};

export { getFirstThursdayAfter, addWeeks }
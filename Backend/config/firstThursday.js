const getFirstThursdayAfter = (from = new Date()) => {
  const date = new Date(from);
  const day = date.getDay() // never zero
  const diff = (4 - day + 7) % 7; // days until next Thursday
  date.setDate(date.getDate() + (diff === 0 ? 7 : diff)); // skip today if already Thu
  return date;
};

const addWeeks = (date, weeks) => {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
};

export { getFirstThursdayAfter, addWeeks }
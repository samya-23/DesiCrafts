export const dateCheck = (param) => {
  if (!param || param.length < 10) return null;

  const day = param.slice(8, 10);
  const month = param.slice(5, 7);
  const year = param.slice(0, 4);

  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  return months[month] ? `${day} ${months[month]} ${year}` : null;
};

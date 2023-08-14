export const fileDownload = (name, format = "csv") => {
  const today = new Date();
  const getToday = today.toISOString().split("T")[0];
  return `${name}_${getToday}.${format}`;
};

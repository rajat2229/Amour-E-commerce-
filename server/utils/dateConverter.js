export const getDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString("default", { month: "long" });
  const day = d.getDate();
  return `${day} ${month} ${year}`;
};

export const dateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
};

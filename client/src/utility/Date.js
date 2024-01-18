


export const formatedDate = (date) => {
  const event = new Date(date);
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  const orderedDate = (event.toLocaleDateString(undefined, options));
  return orderedDate;
}
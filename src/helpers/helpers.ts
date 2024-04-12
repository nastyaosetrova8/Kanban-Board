export const calculateDaysAgo = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const differenceInTime = now.getTime() - createdDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays === 0
    ? "today"
    : differenceInDays === 1
    ? "1 day ago"
    : `${differenceInDays} days ago`;
};

// const colors = [
//   "red",
//   "orange",
//   "yellow",
//   "green",
//   "teal",
//   "blue",
//   "cyan",
//   "purple",
//   "pink",
// ];

// export function pickChakraRandomColor(variant = "") {
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   return color + variant;
// }

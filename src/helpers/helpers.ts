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

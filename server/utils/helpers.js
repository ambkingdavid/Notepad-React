import { formatDistanceToNow } from 'date-fns';


export const formatDate = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    console.log(`Invalid date value: ${date}`)
  }

  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
  return timeAgo
};

export const verifyPassword = (password)
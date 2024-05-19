export function formatTimeLeft(endsAt) {
  const endDate = new Date(endsAt);
  const currentDate = new Date();

  const timeDifference = endDate - currentDate;

  if (timeDifference <= 0) {
    return "Expired";
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  let formattedTimeLeft = "";

  if (days > 0) {
    formattedTimeLeft += `${days}d `;
  }
  if (hours > 0) {
    formattedTimeLeft += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTimeLeft += `${minutes}m `;
  }

  return formattedTimeLeft.trim();
}

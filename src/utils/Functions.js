function formatDate(inputDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const parts = inputDate.split("-");
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  const formattedDate = `${months[month - 1]} ${day}, ${year}`;
  return formattedDate;
}

function formatDuration(durationInMinutes) {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  const seconds = (durationInMinutes * 60) % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

export { formatDate, formatDuration };

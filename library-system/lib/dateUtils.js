/**
 * calculation of due date for a borrowed book
 * @param {string|Date} dueDate due date of the book
 * @returns {Object} days until due, status class, and status text
 */
export function calculateDueStatus(dueDate) {
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  const daysUntilDue = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));

  let statusClass = "";
  let statusText = "";

  if (daysUntilDue < 0) {
    statusClass = "overdue";
    statusText = `Overdue by ${Math.abs(daysUntilDue)} days`;
  } else if (daysUntilDue <= 3) {
    statusClass = "due-soon";
    statusText = `Due soon: ${daysUntilDue} days left`;
  } else {
    statusText = `${daysUntilDue} days left`;
  }

  return {
    daysUntilDue,
    statusClass,
    statusText,
  };
}

/**
 * date formatter
 * @param {string|Date} date //date to format
 * @returns {string} //date string
 */
export function formatDate(date) {
  if (!date) return "N/A";

  try {
    const dateObj = new Date(date);

    // date validation
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", date, error);
    return "Date Error";
  }
}

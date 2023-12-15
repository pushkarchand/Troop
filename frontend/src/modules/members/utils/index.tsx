export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const urlPattern =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g;
export const emailValidationMsg = 'Please enter a valid email address';
export const passwordValidationMsg =
  'The Password must be at least 8 characters long, contain one uppercase letter, lowercase letter,  digit, and  special character.';
export const confirmPasswordValidationMsg =
  'The confirmation password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.';

export function convertDateString(dateString: string): string {
  // Convert string to Date object
  const date = new Date(dateString);

  // Define an array for month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Extract day, month, and year
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

  // Include the year in the result only if it's different from the current year
  const yearPart = year !== currentYear ? ` ${year}` : '';

  // Format the day with appropriate suffix (1st, 2nd, 3rd, etc.)
  const dayWithSuffix = getDayWithSuffix(day);

  // Return the formatted result
  return `${dayWithSuffix} ${month}${yearPart}`;
}

function getDayWithSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return day + 'th';
  }
  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
}

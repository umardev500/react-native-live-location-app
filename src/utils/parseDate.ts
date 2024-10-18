export function formatDate(dateParam: string): string {
  const date = new Date(dateParam);
  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000; // Milliseconds in a day

  // Helper function to format the time (e.g., 11:56 PM)
  const formatTime = (dateParam: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(dateParam);
  };

  // Helper function to format full date (e.g., 24 Sep, 2024 11:56 PM)
  const formatFullDate = (dateParam: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(dateParam);
  };

  // Check if the given date is today
  const isToday = (dateParam: Date, nowParam: Date): boolean =>
    dateParam.getDate() === nowParam.getDate() &&
    dateParam.getMonth() === nowParam.getMonth() &&
    dateParam.getFullYear() === nowParam.getFullYear();

  // Check if the given date is yesterday
  const isYesterday = (dateParam: Date): boolean => {
    const yesterday = new Date(now.getTime() - oneDayInMs);
    return (
      dateParam.getDate() === yesterday.getDate() &&
      dateParam.getMonth() === yesterday.getMonth() &&
      dateParam.getFullYear() === yesterday.getFullYear()
    );
  };

  // Check if the given date is in the same week (Sunday-Saturday)
  const isSameWeek = (dateParam: Date, nowParam: Date): boolean => {
    const today = new Date(nowParam); // Copy the current date (now)
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay()),
    ); // Start of this week (Sunday)
    return dateParam >= startOfWeek && dateParam <= nowParam;
  };

  // Check if the date is today
  if (isToday(date, now)) {
    return `Today ${formatTime(date)}`;
  }

  // Check if the date is yesterday
  else if (isYesterday(date)) {
    return `Yesterday ${formatTime(date)}`;
  }

  // Check if the date is in the same week
  else if (isSameWeek(date, now)) {
    // Return the day name along with the time (e.g., "Monday 11:56 PM")
    const dayName = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(
      date,
    );
    return `${dayName} ${formatTime(date)}`;
  }

  // If the date is older than a week, return full date with time (e.g., "24 Sep, 2024 11:56 PM")
  else {
    return formatFullDate(date);
  }
}

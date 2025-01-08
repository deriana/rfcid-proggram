
export const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString([], { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  
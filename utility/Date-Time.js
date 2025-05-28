export const formatLocalDate = (isoString) => {
    if (!isoString) return "No Date"; // Handle null values
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(isoString).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric", 
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,  
        timeZone: userTimeZone 
    }).replace(",", "");

    return date;
  };
import dayjs from "dayjs";

export function disableDateAfter(dateToCheck: dayjs.Dayjs | null) {
  return (date: dayjs.Dayjs | null): boolean => {
    // Disable dates after the selected date
    if (date) {
      const diff = dateToCheck?.diff(date);
      if (diff) return diff <= 0;
      return false;
    }
    return false;
  };
}

export function disableDateBefore(dateToCheck: dayjs.Dayjs | null) {
  return (date: dayjs.Dayjs | null): boolean => {
    // Disable dates after the selected date
    if (date) {
      const diff = dateToCheck?.diff(date);
      if (diff) return diff >= 0;
      return false;
    }
    return false;
  };
}

export function onlyDateBetween(
  minDate: dayjs.Dayjs | null,
  maxDate: dayjs.Dayjs | null
) {
  return (date: dayjs.Dayjs | null) => {
    // Disable dates after the selected date
    if (date) {
      return date.isBefore(minDate) || date.isAfter(maxDate);
      // || date.year() !== 2022;
    }
    return false;
  };
}

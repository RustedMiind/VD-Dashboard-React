import dayjs from "dayjs";

export function disableDateAfter(dateToCheck: dayjs.Dayjs | null) {
  return (date: dayjs.Dayjs | null) => {
    // Disable dates after the selected date
    if (date) {
      const dateTo = dayjs(dateToCheck);
      return date.isAfter(dateTo) || date.isSame(dateTo);
      // || date.year() !== 2022;
    }
    return false;
  };
}

export function disableDateBefore(dateToCheck: dayjs.Dayjs | null) {
  return (date: dayjs.Dayjs | null) => {
    // Disable dates after the selected date
    if (date) {
      const dateTo = dayjs(dateToCheck);
      return date.isBefore(dateTo) || date.isSame(dateTo);
      // || date.year() !== 2022;
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
      return (
        date.isBefore(minDate) || date.isAfter(maxDate) || date.isSame(maxDate)
      );
      // || date.year() !== 2022;
    }
    return false;
  };
}

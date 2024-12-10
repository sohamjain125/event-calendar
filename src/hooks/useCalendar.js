import { useMemo } from "react";

export const useCalendar = (currentDate) => {
  const daysInMonth = useMemo(() => {
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const days = [];
    let day = start;

    while (day <= end) {
      days.push(new Date(day));
      day = new Date(day.setDate(day.getDate() + 1));
    }

    return days;
  }, [currentDate]);

  const nextMonth = () => {
    return new Date(currentDate.setMonth(currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    return new Date(currentDate.setMonth(currentDate.getMonth() - 1));
  };

  const currentMonth = `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`;

  return { days: daysInMonth, nextMonth, prevMonth, currentMonth };
};

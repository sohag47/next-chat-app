import { useMemo } from "react";

type DateFormate = (date: string) => string;

const useDate = (): DateFormate => {
  const formatDate = useMemo<DateFormate>(() => {
    return (date) => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };

      return new Date(date).toLocaleString(undefined, options);
    };
  }, []);

  return formatDate;
};

export default useDate;

/*
import useFormatDate from './useFormatDate';

const MyComponent = () => {
  const formatDate = useFormatDate();

  const date = '2022-01-01T12:00:00Z';
  const formattedDate = formatDate(date);

  return <div>{formattedDate}</div>;
};
*/

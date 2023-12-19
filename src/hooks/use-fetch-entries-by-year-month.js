import { useSelector } from "react-redux";
import { useFetchEntriesByYearMonthQuery } from "../store";
import dayjs from "dayjs";

export function useFetchEntriesByYearMonth() {
  const { data } = useSelector((state) => {
    return state.date;
  });
  const date = dayjs(data);
  const year = date.year();
  const month = date.month();

  const { data: entries, error, isFetching  } = useFetchEntriesByYearMonthQuery(
    {
      year,
      month
    }
  );

return { date, year, month, data: entries, error, isFetching  };
}
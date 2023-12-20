import { useSelector } from "react-redux";
import { useFetchEntriesByYearQuery } from "../store";
import dayjs from "dayjs";

export function useFetchEntriesByYear() {
  const { data } = useSelector((state) => {
    return state.date;
  });
  const date = dayjs(data);
  const year = date.year();

  const { data: entries, error, isFetching  } = useFetchEntriesByYearQuery({ year });

return { date, year, data: entries, error, isFetching  };
}
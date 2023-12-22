import { useDispatch } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button } from "@mui/material";
import { monthsNameArray } from "../utils";
import { updateDate } from "../store"
import { useFetchEntriesByYearMonth } from "../hooks/use-fetch-entries-by-year-month";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";

function DatePaginator({ views = ['yearMonth'], step = 'month' }) {
  const dispatch = useDispatch();
  const { date, ...rest } = useFetchEntriesByYearMonth();

  const handleClick = (direction = 0) => {
    const stepByFn = date[step].bind(date);
    const byValue = rest[step];
    dispatch(updateDate(stepByFn(byValue + direction).format()));
  }

const viewMode = {
  day: {
    value: ['day'],
    component: <>{rest.day}</>,
  },
  month: {
    value: ['month'],
    component: <>{monthsNameArray[rest.month]}</>,
  },
  year: {
    value: ['year'],
    component: <>{rest.year}</>,
  },
  yearMonth: {
    value: ['year', 'month'],
    component: <>{monthsNameArray[rest.month]} {rest.year}</>,
  },
  yearMonthDay: {
    value: ['year', 'month', 'day'],
    component: <>{monthsNameArray[rest.month]} {rest.day}, {rest.year}</>,
  }
}

  return (
    <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Button
        variant="text"
        onClick={() => handleClick(-1)}
        sx={{
          position: 'absolute',
          zIndex: 1,
          left: 0,
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        <ArrowLeftIcon />
      </Button>
      <Box
        sx={{
          position: 'relative',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={viewMode[views].value}
            onChange={(value) => dispatch(updateDate(value.format()))}
            sx={{
              position: 'relative',
              left: 'calc(50% - 162px)',
              '.MuiInputBase-root fieldset': {
                border: 'none',
              },
              '.MuiInputBase-input': {
                position: 'relative',
                padding: '6px',
                opacity: 0,
              },
              '.MuiButtonBase-root': {
                position: 'absolute',
                width: '100%',
                left: '62px',
                border: '1px solid transparent',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              },
              '.MuiSvgIcon-root': {
                position: 'relative',
                zIndex: 1,
                width: '100%',
                color: 'rgba(0, 0, 0, 0.87)',
              },
            }}
            slotProps={{
              textField: {
              },
              openPickerIcon: {
                component: (props) => {
                  return (
                    <div
                      className={props.className}
                    >
                      {/* {monthsNameArray[rest.month]} {rest.year} */}
                      {viewMode[views].component}
                    </div>
                  );
                },
              }
            }}
          />
        </LocalizationProvider>
      </Box>
      <Button
        variant="text"
        onClick={() => handleClick(+1)}
        sx={{
          position: 'absolute',
          right: 0,
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        <ArrowRightIcon />
      </Button>
    </Box>
    </>
  );
}

export default DatePaginator;
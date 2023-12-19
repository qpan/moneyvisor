import { useDispatch } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button } from "@mui/material";
import { monthsNameArray } from "../utils";
import { updateDate } from "../store"
import { useFetchEntriesByYearMonth } from "../hooks/use-fetch-entries-by-year-month";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";

function DatePaginator() {
  const dispatch = useDispatch();
  const { date, year, month } = useFetchEntriesByYearMonth();

  const handleClick = (direction = month) => {
    dispatch(updateDate(date.month(month + direction).format()));
  }

  return (
    <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fff",
      }}
    >
      <Button
        variant="text"
        onClick={() => handleClick(-1)}
        sx={{
          position: 'absolute',
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
            views={['month', 'year']}
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
                      {monthsNameArray[month]} {year}
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
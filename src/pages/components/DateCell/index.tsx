import React from "react";
import { TableCell, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ATDatePicker from "components/ATDatePicker"; // Assuming this is the correct import path
import { GridRowId } from "@mui/x-data-grid";
import { ATInput } from "components";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
  id?: GridRowId;
  field?: string;
  date: string;
  isEdit: boolean;
  setEditCellValue?: (params: { id: GridRowId; field: string; value: any }) => void;
}

const DateCell: React.FC<Props> = ({ id, field, date, isEdit, setEditCellValue }: Props) => {
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date(date));
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(date));
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      if (setEditCellValue && typeof setEditCellValue === "function") {
        const dateObj: Date = new Date(date);

        // Get the year, month, and day
        const year: number = dateObj.getFullYear();
        // Month needs adjustment because it's zero-based (0 for January)
        const month: string = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const day: string = ("0" + dateObj.getDate()).slice(-2);

        // Form the desired date string in "Y-m-d" format
        const formattedDate: string = `${year}-${month}-${day}`;
        setEditCellValue({ id: id, field: field, value: formattedDate });
      }
    }
  };

  return (
    <TableCell>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => isEdit && setOpenDatePicker(true)}>
            <CalendarTodayIcon />
          </IconButton>
          {isEdit && (
            <DatePicker
              label=""
              value={value}
              onChange={(newValue) => {
                const date = dayjs(newValue).toDate();
                setValue(newValue);
                handleDateChange(date);
              }}
            />
          )}
          {!isEdit && <span>{new Date(date).toLocaleDateString()}</span>}
        </div>
      </LocalizationProvider>
    </TableCell>
  );
};

export default DateCell;

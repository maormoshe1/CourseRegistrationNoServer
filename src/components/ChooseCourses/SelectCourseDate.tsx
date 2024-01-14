import { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type SelectCourseDateProps = {
  dates: Date[];
  setPickedDate: (pickedDate: Date | null) => void;
};

const SelectCourseDate: React.FC<SelectCourseDateProps> = ({
  dates,
  setPickedDate,
}) => {
  const [date, setDate] = useState("");

  const selectDate = (event: SelectChangeEvent) => {
    let date: string = event.target.value;
    setDate(date);
    if (date === "") {
      setPickedDate(null);
    } else {
      const [day, month, year] = date.split(".");
      const dateObject: Date = new Date(`${year}-${month}-${day}`);
      setPickedDate(dateObject);
    }
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: "0.25em", minWidth: "7em" }}>
        <InputLabel id="demo-simple-select-standard-label">תאריך</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={date}
          onChange={selectDate}
          label="Date"
        >
          <MenuItem value="">
            <em>---</em>
          </MenuItem>
          {dates.map((dateOption, key) => {
            let dateString  = new Date(dateOption).toLocaleDateString()
            return (
              <MenuItem key={key} value={dateString}>
                {dateString}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCourseDate;

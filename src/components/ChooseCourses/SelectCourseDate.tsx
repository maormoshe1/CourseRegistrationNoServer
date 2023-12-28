import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SelectCourseDateProps = {
  dates: Date[];
  setPickedDate: (pickedDate: Date | null) => void;
};

const SelectCourseDate: React.FC<SelectCourseDateProps> = ({
  dates,
  setPickedDate,
}) => {
  const [date, setDate] = useState<string>("");
  const [datesOptions, setDatesOptions] = useState<Date[]>(dates);

  useEffect(() => {
    setDatesOptions(dates);
  }, [dates]);

  const handleChange = (event: SelectChangeEvent) => {
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
          onChange={handleChange}
          label="Date"
        >
          <MenuItem value="">
            <em>---</em>
          </MenuItem>
          {datesOptions.map((dateOption, key) => {
            let dateString = dateOption.toLocaleDateString();
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

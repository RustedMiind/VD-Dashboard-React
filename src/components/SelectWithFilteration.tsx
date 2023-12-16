import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

export const SelectWithFilteration = (props: PropsType) => {
  const [filteredOptions, setFilteredOptions] = useState(props.options);

  const handleInputChange = (event: unknown, value: string) => {
    const inputValue = value.trim().toLowerCase();
    const filtered = props.options.filter((option) =>
      option.label.toLowerCase().includes(inputValue)
    );
    setFilteredOptions(filtered);
  };

  return (
    <Autocomplete
      options={filteredOptions}
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => console.log(value)} // Handle selected value
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type to Filter"
          onChange={(event) => handleInputChange(event, event.target.value)}
        />
      )}
      // getOptionSelected={(option, value) => option.label === value}
      // renderOption={(props, option) => (
      //   <div>
      //     {option.label} (ID: {option.id})
      //   </div>
      // )}
    />
  );
};

type PropsType = {
  options: { label: string; id: number | string }[];
};

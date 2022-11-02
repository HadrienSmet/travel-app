import { useState } from 'react';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

const InputYears = ({ changeYear }) => {
  const [year, setYear] = useState('');
  const years = [];
  for (let i = 1945; i < 2006; i++) {
    years.push(i);
  }

  const handleChange = (e) => {
    setYear(e.target.value);
    changeYear(e.target.value);
    ;
  };

  return (
    <div className='extra-data-form__input'>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Année</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={year}
          label="Year"
          onChange={(e) => handleChange(e)}
        >
          {years.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
        </Select>
      </FormControl>
    </div>
  );
}

export default InputYears;
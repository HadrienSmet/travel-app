import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const InputAge = ({ changeAge }) => {
  const [age, setAge] = useState('');
  const numbers = [];
  for (let i = 16; i < 100; i++) {
    numbers.push(i);
  }

  const handleChange = (e) => {
    setAge(e.target.value);
    changeAge(e.target.value);
    ;
  };

  return (
    <div className='personal-data-form__input'>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={(e) => handleChange(e)}
        >
          {numbers.map((number) => (<MenuItem key={number} value={number}>{number}</MenuItem>))}
        </Select>
      </FormControl>
    </div>
  );
}

export default InputAge;
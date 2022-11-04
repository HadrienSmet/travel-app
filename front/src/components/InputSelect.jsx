import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const InputSelect = ({ dynamicClass, dynamicPlaceholder, choices, changeChoice }) => {
  const [choice, setChoice] = useState('');

  const handleChange = (e) => {
    setChoice(e.target.value);
    changeChoice(e.target.value);
    ;
  };

  return (
    <div className={dynamicClass}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">{dynamicPlaceholder}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={choice}
          label={dynamicPlaceholder}
          onChange={(e) => handleChange(e)}
        >
          {choices.map((choice) => (<MenuItem key={choice} value={choice}>{choice}</MenuItem>))}
        </Select>
      </FormControl>
    </div>
  );
}

export default InputSelect;
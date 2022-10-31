import { useState, useMemo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import countryList from 'react-select-country-list';

const CountrySelector = ({ changeCountry }) => {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = (e) => {
    setValue(e.target.value)
    changeCountry(e.target.value)
  }

  return (
    <div className='personal-data-form__input'>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Pays</InputLabel>
        <Select
          options={options}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label="Pays"
          onChange={changeHandler}
        >
          {options.map((option) => (<MenuItem key={option.label} value={option.label}>{option.label}</MenuItem>))}
        </Select>
      </FormControl>
    </div> 
  )
}

export default CountrySelector



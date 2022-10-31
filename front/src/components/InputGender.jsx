import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const genders = [
  'Homme',
  'Femme',
  'Transexuel',
  'Non-binaire',
];

function getStyles(gender, personGender, theme) {
  return {
    fontWeight:
      personGender.indexOf(gender) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const InputGender = ({ changeGender }) => {
  const theme = useTheme();
  const [personGender, setPersonGender] = useState("");

  const handleChange = (e) => {
    setPersonGender(e.target.value);
    changeGender(e.target.value);
  };

  return (
    <div className='personal-data-form__input'>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="gender-label">Genre</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          // multiple
          value={personGender}
          onChange={handleChange}
          input={<OutlinedInput label="Gender" />}
          MenuProps={MenuProps}
        >
          {genders.map((gender) => (
            <MenuItem
              key={gender}
              value={gender}
              style={getStyles(gender, personGender, theme)}
            >
              {gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default InputGender;
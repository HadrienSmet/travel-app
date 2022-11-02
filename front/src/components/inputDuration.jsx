import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Select, FormControl, MenuItem, InputLabel, OutlinedInput } from '@mui/material';

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

const durations = [
  '1 Mois',
  '2 Mois',
  '3 Mois',
  '4 Mois',
  '5 Mois',
  '6 Mois',
  '7 Mois',
  '8 Mois',
  '9 Mois',
  '10 Mois',
  '11 Mois',
  '1 Ans',
  '2 Ans',
  '3 Ans',
  'Je me suis perdu'
];

function getStyles(duration, tripDuration, theme) {
  return {
    fontWeight:
      tripDuration.indexOf(duration) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const InputDuration = ({ changeDuration }) => {
  const theme = useTheme();
  const [tripDuration, setTripDuration] = useState("");

  const handleChange = (e) => {
    setTripDuration(e.target.value);
    changeDuration(e.target.value);
  };

  return (
    <div className='extra-data-form__input'>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="duration-label">Durée</InputLabel>
        <Select
          labelId="duration-label"
          id="duration"
          // multiple
          value={tripDuration}
          onChange={handleChange}
          input={<OutlinedInput label="Duration" />}
          MenuProps={MenuProps}
        >
          {durations.map((duration) => (
            <MenuItem
              key={duration}
              value={duration}
              style={getStyles(duration, tripDuration, theme)}
            >
              {duration}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default InputDuration;
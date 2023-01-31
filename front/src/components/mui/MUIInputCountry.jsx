import { useState, useMemo } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import countryList from "react-select-country-list";

const useMUIInputCountry = ({ changeCountry }) => {
    const [value, setValue] = useState("");

    //This function change the state of this component and the state of his parent
    //@Params { Type: Object } --> The param of the onChange event
    const changeHandler = (e) => {
        setValue(e.target.value);
        changeCountry(e.target.value);
    };

    return {
        value,
        changeHandler,
    };
};

const MUIInputCountry = ({
    dynamicClass,
    dynamicPlaceholder,
    changeCountry,
}) => {
    const { value, changeHandler } = useMUIInputCountry({ changeCountry });
    const options = useMemo(() => countryList().getData(), []);

    return (
        <div className={dynamicClass}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                    {dynamicPlaceholder}
                </InputLabel>
                <Select
                    options={options}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value}
                    label={dynamicPlaceholder}
                    onChange={changeHandler}
                >
                    {options.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default MUIInputCountry;

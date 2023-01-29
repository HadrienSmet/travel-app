import { useState } from "react";
import { Select, FormControl, MenuItem, InputLabel } from "@mui/material";

const useMuiInputNumbers = ({ changeNumber }) => {
    const [number, setNumber] = useState("");

    //This function change the state of this component and the state of his parent
    //@Params { Type: Object } --> The param of the onChange event
    const handleChange = (e) => {
        setNumber(e.target.value);
        changeNumber(e.target.value);
    };

    return {
        number,
        handleChange,
    };
};

const MUIInputNumbers = ({
    minNumber,
    maxNumber,
    dynamicClass,
    dynamicPlaceholder,
    changeNumber,
}) => {
    const { number, handleChange } = useMuiInputNumbers({ changeNumber });
    const numbers = [];
    for (let i = minNumber; i < maxNumber; i++) {
        numbers.push(i);
    }

    return (
        <div className={dynamicClass}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                    {dynamicPlaceholder}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={number}
                    label="Number"
                    onChange={(e) => handleChange(e)}
                >
                    {numbers.map((number) => (
                        <MenuItem key={number} value={number}>
                            {number}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default MUIInputNumbers;

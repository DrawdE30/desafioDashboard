import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectCustom = ({ title, options, type = "single", keyValue, keyLabel, value = [], handleChange, required = false, }) => {
    const isMultiple = type === "multiple";
    return (
        <FormControl className="container-select" size="small">
            <InputLabel id="select-small-label">{title}</InputLabel>
            <Select
                labelId="multiple-name-label"
                id="multiple-name"
                label={title}
                multiple={isMultiple}
                value={value}
                onChange={handleChange}
                className="custom-select"
                required={required}
            >
                <MenuItem className="custom-option" value="" disabled>
                    <em>None</em>
                </MenuItem>
                {options?.map((option, idxOpt) => {
                    return (
                        <MenuItem className="custom-option" key={`opt-${idxOpt}`} value={option[keyValue]}>{option[keyLabel]}</MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    )
}

export default SelectCustom
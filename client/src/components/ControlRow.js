import React from 'react'
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const ControlRow = () => {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" >
        <Typography>EN</Typography>
         <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
        <Typography>JP</Typography>
    </Stack>
  )
}

export default ControlRow
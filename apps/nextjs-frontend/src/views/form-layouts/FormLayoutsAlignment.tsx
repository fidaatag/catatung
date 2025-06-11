'use client';

// React Imports
import {useState} from 'react';

// MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

function FormLayoutsAlignment() {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleClickShowPassword = () => {
    setIsPasswordShown((show) => !show);
  };

  return (
    <Card>
      <CardHeader title="Form Alignment" />
      <CardContent className="flex flex-col items-center justify-center bs-[500px]">
        <form
          className="p-12 max-is-[400px] border rounded"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h5">Sign In</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" placeholder="johnDoe " />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                placeholder="············"
                id="form-layout-alignment-password"
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} className="pbs-2">
              <FormControlLabel control={<Checkbox />} label="Remember me" />
            </Grid>
            <Grid item xs={12} className="pbs-2">
              <Button fullWidth variant="contained" type="submit">
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormLayoutsAlignment;

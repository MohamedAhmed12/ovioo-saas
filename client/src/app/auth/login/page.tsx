'use client';

import { FormEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthCard from '@/components/AuthCard';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className="login flex flex-col items-center py-24">
      <AuthCard handleSubmit={handleSubmit}>
        <>
          <div className="m-6 flex flex-col items-center">
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <h5>Sign in</h5>
            <div className="mt-1">
              <TextField
                className="m-0"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <FormControl className="mt-6 w-full" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <button
                type="submit"
                className="my-3 w-full py-2 rounded-[4px] bg-[--dashboard-primary] text-white font-semibold"
              >
                Sign In
              </button>
              <Grid container direction="column">
                <Grid item xs>
                  <Link href="#">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link href="#">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </div>
          </div>
          <Divider>Or</Divider>
          <div className="flex pt-5	 place-content-center space-x-20">
            <Link href="#">
              <GoogleIcon className="text-4xl text-" />
            </Link>
            <Link href="#">
              <FacebookIcon className="text-4xl" />
            </Link>
            <Link href="#">
              <LinkedInIcon className="text-4xl" />
            </Link>
          </div>
        </>
      </AuthCard>
    </div>
  );
}

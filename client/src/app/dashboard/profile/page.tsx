'use client';

import '@/styles/app/profile/index.scss';
import TextField from '@mui/material/TextField';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import DashBoardCard from '@/components/DashBoardCard';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormEvent, useState } from 'react';

export default function Profile() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation(show => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className="profilepage px-40 flex flex-col lg:flex-col w-full">
      <div className="profile-card">
        <DashBoardCard
          handleSubmit={handleSubmit}
          headerTitle="profile settings"
        >
          <>
            <div className="flex flex-row">
              <div className="basis-1/5 flex flex-col pr-5">
                <img src="/a" alt="" />
                <div className="mt-5 mb-3">
                  <img className="mb-1 mr-1" src="/icon-cameraa" />
                  <span className="blue-text">Edit photo</span>
                </div>
              </div>
              <div className="basis-4/5 flex flex-col">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  id="email"
                  autoComplete="current-password"
                />
                <Select defaultValue="dog" className="my-3 h-14">
                  <Option value="dog">Dog</Option>
                  <Option value="cat">Cat</Option>
                </Select>
              </div>
            </div>
            <div className="flex w-full justify-end mt-6">
              <Button type="submit" className="bg-black hover:bg-white ">
                Sign In
              </Button>
            </div>
          </>
        </DashBoardCard>
      </div>
      <div className="notification-card">
        <DashBoardCard
          handleSubmit={handleSubmit}
          headerTitle="Notification Settings"
        >
          <>
            <div className="flex flex-col px-[35px] py-[24px]">
              <div className="flex flex-row justify-between">
                <div className="text-base">
                  Browser push notifications (Updates & Comments from designers)
                </div>
                <div>
                  <Switch {...label} />
                </div>
              </div>
              <div className="md:mt-0 mt-[20px] flex flex-raw">
                <img src="https://res.cloudinary.com/pizdata/image/upload/v1626192951/app/platform/images/i-alert.svg" />
                <span className="ml-1 text-aw-gray-400 text-sm font-light">
                  Unfortunately, this function is not currently available in
                  Safari
                </span>
              </div>
            </div>
          </>
        </DashBoardCard>
      </div>
      <div className="Security-card">
        <DashBoardCard
          handleSubmit={handleSubmit}
          headerTitle="Security Settings"
        >
          <>
            <div className="flex flex-col px-[35px] py-[24px]">
              <div className="flex flex-col">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Current Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControl className="m-1 w-full" variant="outlined">
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
                <FormControl className="m-1 w-full" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowPasswordConfirmation}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="confirm Password"
                  />
                </FormControl>
              </div>
            </div>
            <div className="flex w-full justify-end mt-6">
              <Button type="submit" className="bg-black hover:bg-white ">
              Update
              </Button>
            </div>
          </>
        </DashBoardCard>
      </div>
    </div>
  );
}

'use client';

import '@/styles/app/profile/profile.scss';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import CardActions from '@mui/joy/CardActions';
import CardHeader from '@mui/material/CardHeader';
import AspectRatio from '@mui/joy/AspectRatio';
import Image from 'next/image';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function Profile() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <div className="profilepage  flex flex-col lg:flex-row">
      <div className="profilecard bg-white mt-8 flex flex-col items-center mb-6">
        <Container  component="main" maxWidth="xs">
          <CardHeader title="Profile Settings " />
          <CssBaseline />
          <Box className="box pr-10 pl-10 pt-10 pb-10 bg-secondary  ">
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Select defaultValue="dog">
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
              </Select>
              <Button 
                type="submit"
                fullWidth
                variant="solid"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
      <div className="securitycard object-cover justify-between pt-5 ">
        <Card
          className="object-scale-down"
          variant="solid"
          color="primary"
          invertedColors
        >
          <CardHeader title="Profile Settings" />
          <CardContent className="main" orientation="horizontal">
            <CardContent className="card1 ">
              <AspectRatio className=" ">
                <Image
                  src="/images/smile.jpg"
                  alt="smile"
                  width={500}
                  height={500}
                />
              </AspectRatio>
            </CardContent>
            <CardContent>
              <Typography component="h1" variant="h5">
                Gross profit
              </Typography>
              <Typography component="h1" variant="h5">
                $ 432.6M
              </Typography>
            </CardContent>
            <CardContent>
              <Typography component="h1" variant="h5">
                Gross profit
              </Typography>
              <Typography component="h1" variant="h5">
                $ 432.6M
              </Typography>
            </CardContent>
          </CardContent>
          <CardActions>
            <Button variant="soft" size="sm">
              Add to Watchlist
            </Button>
            <Button variant="solid" size="sm">
              See breakdown
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

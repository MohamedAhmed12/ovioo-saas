'use client';

import DashBoardCard from '@/components/DashBoardCard';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FormEvent } from 'react';

export default function AddTeamMemberCard({
  handleSubmit,
  headerTitle,
}: {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  headerTitle: string;
}) {
  return (
    <DashBoardCard handleSubmit={handleSubmit} headerTitle={headerTitle}>
      <>
        <div className="flex flex-row">
          <div className="w-full flex flex-col">
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">
                The new teammate was added! The invitation has been sent to
                mazenA7med2000@gmail.com
              </Alert>
              <Alert severity="info">
                Users will be able to manage tasks and receive notifications.
                Only you can add and delete your team users.
              </Alert>
            </Stack>
            <TextField
              className="dashboard-input"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              id="email"
            />
            <TextField
              className="dashboard-input"
              margin="normal"
              required
              fullWidth
              id="first-name"
              label="first name"
              name="firstname"
              autoFocus
            />
            <TextField
              className="dashboard-input"
              margin="normal"
              required
              fullWidth
              id="last-name"
              label="last name"
              name="lastname"
              autoFocus
            />
          </div>
        </div>
        <div className="flex w-full justify-end mt-6">
          <Button
            type="submit"
            className="bg-[--dashboard-primary] text-white "
          >
            add user
          </Button>
        </div>
      </>
    </DashBoardCard>
  );
}

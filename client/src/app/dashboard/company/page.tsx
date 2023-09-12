'use client';
import DashBoardCard from '@/components/DashBoardCard';
import { styled, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { FormEvent, useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

export default function Profile() {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: '#E0E3E7',
      borderWidth: 1,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 4,
      padding: '4px !important', // override inline-style
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <div className="company-card px-40 flex flex-col lg:flex-col w-full">
      <DashBoardCard handleSubmit={handleSubmit} headerTitle="profile settings">
        <>
          <div className="flex flex-row">
            <div className="w-full flex flex-col">
              <TextField
                className="dashboard-input"
                margin="normal"
                fullWidth
                id="Company-name"
                label="Company name"
                name="Company name"
                autoComplete="Company-name"
                autoFocus
              />
              <TextField
                className="dashboard-input"
                margin="normal"
                fullWidth
                name=" link"
                label="Website link"
                type="link"
                id="link"
                autoComplete="Website-link"
              />
                 <TextField
                className="dashboard-input"
                margin="normal"
                fullWidth
                name="what is your business About"
                label="what is your business About?"
                type="what is your business About"
                id="what-is-your-business-About"
                multiline
              />
              <TextField
                className="dashboard-input"
                margin="normal"
                fullWidth
                name="client"
                label="describe your client/ target audience"
                type="client"
                id="client"
                multiline
              />
              <TextField
                className="dashboard-input"
                margin="normal"
                fullWidth
                name="Other links"
                label="Other links"
                type="Other links"
                id="Other-links"
                multiline
              />
            </div>
          </div>
          <div className="flex w-full justify-end mt-6">
            <Button
              type="submit"
              className="bg-[--dashboard-primary] text-white "
            >
              update
            </Button>
          </div>
        </>
      </DashBoardCard>
    </div>
  );
}

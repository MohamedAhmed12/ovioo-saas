import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { FormEvent, ReactElement } from 'react';

export default function DashBoardCard({
  children,
  handleSubmit,
  headerTitle,
}: {
  children: ReactElement;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  headerTitle?: string;
}) {
  return (
    <Card component="main" className="bg-white mt10 mb-10">
      {headerTitle && (
        <CardHeader className="bg-slate-200 w-full capitalize font-semibold" title={headerTitle}/>
      )}
      <Box className="box pr-7 pl-7 pt-7 pb-7 bg-secondary">
        <Box
          className="box pr-7 pl-7 pt-7 pb-7 bg-secondary flex flex-col"
          component="form"
          onSubmit={handleSubmit}
          noValidate
        >
          {children}
        </Box>
        <div className="flex w-full justify-end mt-6">
          <Button type="submit" className="bg-black hover:bg-white ">
            Sign In
          </Button>
        </div>
      </Box>
    </Card>
  );
}

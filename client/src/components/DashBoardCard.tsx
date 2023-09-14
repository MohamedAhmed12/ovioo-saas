import Box from '@mui/joy/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { FormEvent, ReactElement } from 'react';

export default function DashBoardCard({
  children,
  handleSubmit,
  headerTitle,
}: {
  children: ReactElement;
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  headerTitle?: string;
}) {
  return (
    <Card component="main" className="ovioo-card with-shadow mt10 mb-10">
      {headerTitle && (
        <CardHeader
          className="bg-slate-300 dark:bg-slate-500 w-full capitalize font-semibold text-start"
          title={headerTitle}
        />
      )}
      <Box
        className="box pr-7 pl-7 pt-7 pb-7 bg-secondary flex flex-col"
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        {children}
      </Box>
    </Card>
  );
}

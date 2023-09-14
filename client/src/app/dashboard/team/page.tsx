'use client';

import AddTeamMemberCard from '@/components/Dashboard/Team/AddTeamMemberCard';
import TeamsCard from '@/components/Dashboard/Team/TeamsCard';
import { FormEvent, useState } from 'react';
import { User as UserInterface } from '@/interfaces';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<UserInterface[]>([
    {
      firstname: 'owner',
      lastname: 'lastname',
      email: 'owner@ovioo.com',
    },
  ]);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {email, firstname, lastname} = new FormData(event.currentTarget);
    // (...)  <- search for those they are one -> (search on google (merge 2 object using spread operator in js))
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <div className="team-card px-40 flex flex-row lg:flex-col w-full">
      <div className="new-user basis-4/5 flex flex-raw lg:flex-col ">
        <AddTeamMemberCard
          handleSubmit={handleSubmit}
          headerTitle="headerTitle"
        />
      </div>
      <div className="Company Team basis-1/5 flex flex-col lg:flex-col">
        {teamMembers.length > 1 && (
          <TeamsCard headerTitle="headerTitle" teamMembers={teamMembers} />
        )}
      </div>
    </div>
  );
}

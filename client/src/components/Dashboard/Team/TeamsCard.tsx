'use client';

import DashBoardCard from '@/components/DashBoardCard';
import { User as UserInterface } from '@/interfaces';

export default function TeamsCard({
  headerTitle,
  teamMembers,
}: {
  headerTitle: string;
  teamMembers: UserInterface[];
}) {
  return (
    <DashBoardCard headerTitle={headerTitle}>
      <p>aaaaaaaaaaaaaaaaaaaaaaaaa</p>
    </DashBoardCard>
  );
}

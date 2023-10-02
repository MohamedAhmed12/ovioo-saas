"use client";

import AddTeamMemberCard from "@/components/Dashboard/Team/AddTeamMemberCard";
import TeamMembersCard from "@/components/Dashboard/Team/TeamMembersCard";
import { RoleEnum, User as UserInterface } from "@/interfaces";
import { useState } from "react";

export default function Team() {
    const [teamMembers, setTeamMembers] = useState<UserInterface[]>([
        {
            fullname: "owner lastname",
            email: "owner@ovioo.com",
            role: RoleEnum.OWNER,
        },
        {
            fullname: "member1 member lastname",
            email: "member@ovioo.com",
            role: RoleEnum.MEMBER,
        },
        {
            fullname: "member2 member lastname",
            email: "member2@ovioo.com",
            role: RoleEnum.MEMBER,
        },
    ]);

    const label = { inputProps: { "aria-label": "Switch demo" } };

    const handleAddTeamMember = (newMember: UserInterface) =>
        setTeamMembers([...teamMembers, newMember]);

    return (
        <div className="team-card flex flex-col lg:flex-row w-full justify-between flex-wrap max-w-full">
            <div className="new-user basis-[52%] flex flex-raw lg:flex-col px-5">
                <AddTeamMemberCard
                    handleSubmit={handleAddTeamMember}
                    headerTitle="Add new member"
                />
            </div>
            <div className="Company Team basis-[48%] flex flex-col lg:flex-col px-5">
                {teamMembers.length > 1 && (
                    <TeamMembersCard headerTitle="your team" teamMembers={teamMembers} />
                )}
            </div>
        </div>
    );
}

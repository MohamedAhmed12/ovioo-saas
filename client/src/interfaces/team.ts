export interface Team {
    id: string;
    owner_id: string;
    members: Member[];
}

export interface Member {
    id: string;
    fullname: string;
    email: string;
    avatar: string;
    isActive: boolean;
}

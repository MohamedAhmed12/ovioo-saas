export interface Team {
    id: string;
    owner_id: string;
    users: Member[];
}

export interface Member {
    id: string;
    fullname: string;
    email: string;
    avatar: string;
}

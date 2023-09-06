export interface Notification {
    createdAt: Date,
    id: number,
    isUnRead: boolean,
    title: string,
    description: string,
    type: string,
    avatar: string|null,
};
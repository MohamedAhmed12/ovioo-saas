export interface NotificationInterface {
    id: number;
    content: string;
    action: string;
    is_read: boolean;
    created_at: Date;
    userId: number;
}

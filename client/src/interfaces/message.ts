import { Asset } from "./asset";
import { TaskInterface } from "./store/board";
import { User } from "./user";

export interface MessageInterface {
    id: number;
    content: string | null;
    voice_note_src: string | null;
    asset: Partial<Asset> | null;
    sender: User | null;
    task: TaskInterface;
    status: MessageStatusEnum;
    received_by: string;
    read_by: string;
    isFailed?: boolean;
    task_id?: string;
    created_at: Date;
}

export interface SendMessageDto {
    task_id?: string;
    isFailed?: boolean;
    content: string | null;
    voice_note_src: string | null;
    asset: Partial<Asset> | null;
}

export enum MessageStatusEnum {
    WAITING = "waiting",
    SENT = "sent",
    RECEIVED = "received",
    READ = "read",
}

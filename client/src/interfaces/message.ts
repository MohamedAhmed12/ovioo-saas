import { Asset } from "./asset";
import { TaskInterface } from "./store/board";
import { User } from "./user";

export interface MessageInterface {
    id: number;
    content: string | null;
    voice_note_src: string | null;
    asset: Asset | null;
    sender: User | null;
    task: TaskInterface;
    status: MessageStatusEnum;
    created_at: Date;
}

export interface SendMessageDto {
    task_id: string;
    content: string;
    voice_note_src: string;
    asset: Partial<Asset> | null;
}

export enum MessageStatusEnum {
    WAITING = "waiting",
    SENT = "sent",
    RECEIVED = "received",
    READ = "read",
}

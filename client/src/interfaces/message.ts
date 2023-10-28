import { TaskInterface } from "./store/board";
import { User } from "./user";

export interface MessageInterface {
    id: number;
    content: string|null;
    voice_note_src: string|null;
    asset_src: string|null;
    sender: User|null;
    task: TaskInterface;
    created_at: Date;
    updated_at: Date;
}

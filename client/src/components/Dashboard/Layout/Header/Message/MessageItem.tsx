import { TaskInterface } from "@/interfaces";
import { MessageStatusEnum } from "@/interfaces/message";
import "@/styles/components/dashboard/layout/header/notifications-popover.scss";
import { fToNow } from "@/utils/formatTime";
import {
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdAccessTime, MdAccountCircle } from "react-icons/md";

export default function MessageItem({ task }: { task: TaskInterface }) {
    const router = useRouter();
    const handleOpenMessageTask = () =>
        router.push(`/dashboard/task?task=${task.id}`);
    const title = (
        <Typography variant="subtitle2" className="flex flex-col">
            {task.messages[0].sender?.fullname}
            <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.secondary" }}
                className="flex justify-between items-center"
            >
                <span className=" truncate">{task.messages[0].content}</span>
                <div className="flex bg-[#d32f2f] rounded-full min-w-[22px] h-[22px] ml-2 justify-center items-center text-white">
                    {task.unreadMessagesCount}
                </div>
            </Typography>
        </Typography>
    );

    return (
        <ListItemButton
            sx={{
                py: 1.5,
                px: 2.5,
                mt: "1px",
                ...(task.messages[0].status != MessageStatusEnum.READ && {
                    bgcolor: "action.selected",
                }),
            }}
            onClick={handleOpenMessageTask}
        >
            <ListItemAvatar className="mr-2">
                {task.messages[0]?.sender?.avatar ? (
                    <Image
                        src={task.messages[0]?.sender?.avatar}
                        width="100"
                        height="100"
                        alt="profile"
                        className="rounded-full mb-4"
                        style={{
                            width: 50,
                            height: 50,
                            minWidth: 50,
                        }}
                    />
                ) : (
                    <MdAccountCircle style={{ width: 50, height: 50 }} />
                )}
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <Typography
                        variant="caption"
                        sx={{
                            color: "text.disabled",
                        }}
                        className="flex items-center !mt-2"
                    >
                        <MdAccessTime className="mr-2" />
                        {fToNow(task.messages[0].created_at)}
                    </Typography>
                }
            />
        </ListItemButton>
    );
}

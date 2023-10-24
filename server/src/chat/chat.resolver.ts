import { Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Message } from './message.entity';

@Resolver(() => Message)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}
}

import { Test, TestingModule } from '@nestjs/testing';
import { ChatWebsocketFnService } from './chat_websocket_fn.service';

describe('ChatWebsocketFnService', () => {
  let service: ChatWebsocketFnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatWebsocketFnService],
    }).compile();

    service = module.get<ChatWebsocketFnService>(ChatWebsocketFnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

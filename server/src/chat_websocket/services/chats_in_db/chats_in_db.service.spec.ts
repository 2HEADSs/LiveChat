import { Test, TestingModule } from '@nestjs/testing';
import { ChatsInDbService } from './chats_in_db.service';

describe('ChatsInDbService', () => {
  let service: ChatsInDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatsInDbService],
    }).compile();

    service = module.get<ChatsInDbService>(ChatsInDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

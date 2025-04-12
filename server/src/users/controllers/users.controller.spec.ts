import { Test, TestingModule } from '@nestjs/testing';
import { UsersControler } from './users.controller';

describe('ControllersController', () => {
  let controller: UsersControler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersControler],
    }).compile();

    controller = module.get<UsersControler>(UsersControler);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { faker } from '@faker-js/faker';
import { build, perBuild, sequence } from '@jackfranklin/test-data-bot';
import { mock } from 'jest-mock-extended';

const userBuilder = build<Partial<User>>({
  fields: {
    id: sequence(),
    name: perBuild(() => faker.name.findName()),
    email: perBuild(() => faker.internet.exampleEmail()),
    createdAt: perBuild(() => new Date()),
    updatedAt: perBuild(() => new Date()),
  },
  postBuild: (u) => new User(u),
});

describe('Auth Controller', () => {
  let controller: AuthController;
  const repositoryMock = mock<Repository<User>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMock,
        },
      ],
      imports: [JwtModule.register({ secret: process.env.APP_SECRET })],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Register method test
  it('should register a new user', async () => {
    const register = {
      name: 'John Doe',
      email: 'john@doe.me',
      password: 'Pa$$w0rd',
    };
    repositoryMock.save.mockResolvedValueOnce(
      userBuilder({ overrides: register }) as User,
    );

    await expect(controller.register(register)).resolves.not.toHaveProperty(
      'password',
    );
  });

  // Login method test
  it('should log in an user', async () => {
    const user = userBuilder({
      overrides: {
        name: 'John Doe',
        email: 'john@doe.me',
      },
    });

    await expect(controller.login(user as User)).resolves.not.toHaveProperty(
      'password',
    );
  });

  it('should got me logged', () => {
    const user = userBuilder({
      overrides: {
        name: 'John Doe',
        email: 'john@doe.me',
      },
    });

    expect(controller.me(user as User)).toEqual(user);
  });
});

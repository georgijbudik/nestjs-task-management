import { NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { Test } from '@nestjs/testing';

const mockTasksRepository = () => ({
  getAllTasks: jest.fn(),
  getTaskById: jest.fn(),
});

const mockUser = {
  id: 'someId',
  username: 'Name',
  password: 'somepassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });
  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and return the result', async () => {
      tasksRepository.getAllTasks.mockResolvedValue('someValue');
      const result = await tasksService.getAllTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });
  describe('getTaskById', () => {
    it('calls TasksRepository.getTaskById and return the result', async () => {
      const mockTask = {
        id: 'someId',
        title: 'sometitle',
        description: 'statusdescription',
        status: TaskStatus.OPEN,
      };
      tasksRepository.getTaskById.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls TasksRepository.getTaskById and throws an error', async () => {
      tasksRepository.getTaskById.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

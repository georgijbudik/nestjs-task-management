import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import errors from 'src/config/errors.config';
import { NotFoundException } from '@nestjs/common/exceptions';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.tasksRepository.getAllTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(errors.idNotFound);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(errors.idNotFound);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}

import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}
  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.tasksRepository.getAllTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.tasksRepository.getTaskById(id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    return await this.tasksRepository.deleteTask(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return await this.tasksRepository.updateTaskStatus(id, status);
  }
}

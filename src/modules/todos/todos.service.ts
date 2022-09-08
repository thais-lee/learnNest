import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoDto, CreateTodoDto } from './dto/todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<TodoDto> {
    const { name, description } = createTodoDto;

    const todo: Todo = await this.todoRepository.create({
      name,
      description,
    });

    return await this.todoRepository.save(todo);
  }

  async getAllTodo(): Promise<TodoDto[]> {
    return await this.todoRepository.find({});
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTodoDto, TodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<TodoDto> {
    return await this.todoService.createTodo(createTodoDto);
  }

  @Get('hello')
  seyHei(): string {
    return 'hell nou';
  }
}

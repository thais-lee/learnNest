import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from './dto/todo.dto';
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

  @Get()
  async getAll(): Promise<TodoDto[]> {
    return await this.todoService.getAllTodo();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<TodoDto> {
    console.log('id', id);

    return this.todoService.getOneById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<string> {
    return this.todoService.deleteTodoById(id);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoDto> {
    return this.todoService.updateTodoById(id, updateTodoDto);
  }
}

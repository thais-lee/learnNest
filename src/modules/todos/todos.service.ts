import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoDto, CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

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

  async getOneById(id: string): Promise<TodoDto> {
    const todo = await this.todoRepository.findOne({
      where: { id },
    });
    if (!todo) {
      throw new HttpException(
        `Todo with that id is not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return todo;
  }

  async getTodoByName(content: string): Promise<TodoDto[]> {
    // const todos = await this.todoRepository
    //   .createQueryBuilder('todo')
    //   .where('todo.name like :content', {
    //     content: '%' + content + '%',
    //   })
    //   .getMany();

    const todos = await this.todoRepository.find({
      where: {
        name: Like(`${content}`),
      },
    });
    console.log('todo', todos, typeof content);

    if (!todos) {
      throw new HttpException(`Not found todo`, HttpStatus.NOT_FOUND);
    }

    return todos;
  }

  async deleteTodoById(id: string): Promise<string> {
    await this.getOneById(id);
    this.todoRepository.delete(id);

    return 'Delete Successfully';
  }

  async updateTodoById(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoDto> {
    let todo = await this.getOneById(id);
    
    if (updateTodoDto.name) {
      todo.name = updateTodoDto.name;
    }

    if (updateTodoDto.description) {
      todo.description = updateTodoDto.description;
    }

    if (updateTodoDto.isCompleted) {
      todo.isCompleted = updateTodoDto.isCompleted;
    }
    return await this.todoRepository.save(todo);
  }
}

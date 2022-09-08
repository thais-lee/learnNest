import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
export class TodoDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  createdAt?: Date;
  description?: string;
}

export class TodoListDto {
  todos: TodoDto[];
}

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;
}

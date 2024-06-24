import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { lastValueFrom } from 'rxjs';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    const data = await this.todoService.create(createTodoInput);
    console.log(data)
    return data;
  }

  @Query(() => [Todo], { name: 'todos' })
  async findAll() {
    const data = await this.todoService.findAll();
    return data;
  }

  // @Query(() => Todo, { name: 'todo' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.todoService.findOne(id);
  // }

  // @Mutation(() => Todo)
  // updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
  //   return this.todoService.update(updateTodoInput.id, updateTodoInput);
  // }

  // @Mutation(() => Todo)
  // removeTodo(@Args('id', { type: () => Int }) id: number) {
  //   return this.todoService.remove(id);
  // }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TodoService {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientProxy,
  ) {}
  create(createTodoInput: CreateTodoInput) {
    return lastValueFrom(
      this.userClient.send(
        { role: 'CREATE-TODO', cmd: 'create-todo' },
        { data: createTodoInput },
      ),
    );
  }

  findAll() {
    return lastValueFrom(
      this.userClient.send(
        { role: 'GET-ALL_TODO', cmd: 'get-all-todo' },
        {},
      ),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoInput: UpdateTodoInput) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

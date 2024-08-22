import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TestEntity } from './entities/test.entity';
import { CreateInput } from './dto/test.input';
import { UpdateInput } from './dto/update-test.input';

@Resolver(TestEntity)
export class FooResolver {
  @Query(() => String)
  sayHello() {
    return 'Hello World';
  }

  @Mutation(() => TestEntity)
  createTest(@Args('data') data: CreateInput) {
    return new TestEntity(data);
  }

  @Mutation(() => TestEntity)
  updateTest(@Args('data') data: UpdateInput) {
    return new TestEntity(data);
  }
}

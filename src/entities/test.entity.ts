import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TestEntity {
  constructor(data: any) {
    this.id = Math.random();
    this.name = data.name;
    this.description = data.description;
  }

  id: number;
  name: string;
  description: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class File {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  uid: string;

  @Column({ name: 'user_uid' })
  @Field()
  userId: string;

  @Column()
  @Field()
  filename: string;

  @Column()
  @Field()
  mimetype: string;

  @Column()
  @Field()
  encoding: string;

  @Column()
  @Field()
  url: string;
}

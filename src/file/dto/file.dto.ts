import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Stream } from 'stream';

@InputType()
export class UploadFilesDTO {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  createReadStream?: () => Stream;
}

@InputType()
class UserIdDTO {
  @Field()
  userId: string;
}

@ArgsType()
export class UploadFilesArgs {
  @Field(() => [GraphQLUpload])
  files: UploadFilesDTO[];

  @Field()
  record: UserIdDTO;
}

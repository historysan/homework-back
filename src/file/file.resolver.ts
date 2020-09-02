import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { File } from './file.entity';
import { UploadFilesArgs } from './dto/file.dto';
import { FileService } from './file.service';

@Resolver('File')
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Query(() => [File])
  getFiles(): Promise<File[]> {
    return this.fileService.getFiles();
  }

  @Mutation(() => [File])
  uploadFiles(@Args() uploadFileArgs: UploadFilesArgs): Promise<File[]> {
    return this.fileService.uploadFiles(
      uploadFileArgs.files,
      uploadFileArgs.record.userId,
      'Files',
    );
  }
}

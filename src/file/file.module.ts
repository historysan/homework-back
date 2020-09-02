import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';
import { File } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, FileRepository])],
  providers: [FileResolver, FileService],
})
export class FileModule {}

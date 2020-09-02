import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UploadFilesDTO } from './dto/file.dto';
import { FileRepository } from './file.repository';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  upload(file: UploadFilesDTO, userId: string, folder: string): Promise<File> {
    return new Promise(async (resolve, reject) => {
      try {
        const { filename, mimetype, encoding, createReadStream } = await file;

        const readStream = createReadStream();

        const urlKey = `${folder}/${filename}`;

        const params = {
          Body: readStream,
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: urlKey,
          ContentType: mimetype,
          ACL: 'public-read',
        };
        const data = await this.s3.upload(params).promise();

        const newFile = new File();
        newFile.filename = filename;
        newFile.encoding = encoding;
        newFile.mimetype = mimetype;
        newFile.userId = userId;
        newFile.url = data.Location;

        await this.fileRepository.save(newFile);

        resolve(newFile);
      } catch (error) {
        reject(error);
        console.error(error);
      }
    });
  }

  async uploadFiles(
    files: UploadFilesDTO[],
    userId: string,
    folder: string,
  ): Promise<File[]> {
    const filesMapped = files.map(file => this.upload(file, userId, folder));
    return await Promise.all(filesMapped);
  }

  async getFiles(): Promise<File[]> {
    return await this.fileRepository.find();
  }
}

import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from 'src/file/file.module';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Folder, FolderSchema } from './schemas/folder.schema';

@Module({
  imports: [
    forwardRef(() => FileModule),
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }])
  ],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService],
})
export class FolderModule {}

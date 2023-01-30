import { forwardRef, Module } from '@nestjs/common';
import { FolderModule } from 'src/folder/folder.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
    imports: [forwardRef(() => FolderModule)],
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService]
})
export class FileModule {}

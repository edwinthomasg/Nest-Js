import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema, STUDENT_MODEL } from './schemas/student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name: STUDENT_MODEL,
        schema: StudentSchema
    }])],
    controllers: [StudentController],
    providers: [StudentService]
})
export class StudentModule {}

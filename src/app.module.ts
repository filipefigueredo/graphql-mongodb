import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { Student } from './student/student.entity';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: Number('27018'),
      username: '',
      password: '',
      database: 'School',
      useUnifiedTopology: true,
      entities: [Lesson, Student],
      ssl: false,
    }),
    LessonModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

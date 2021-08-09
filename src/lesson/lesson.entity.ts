import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
  @ObjectIdColumn()
  _id: string; // MongoDB internal ID

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  students: string[];
}

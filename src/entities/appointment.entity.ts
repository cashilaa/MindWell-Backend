import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Therapist } from './therapist.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Therapist)
  therapist: Therapist;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  notes: string;
}

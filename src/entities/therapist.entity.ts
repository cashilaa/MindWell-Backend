import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Therapist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  description: string;

  @Column('simple-array')
  expertise: string[];

  @Column()
  yearsOfExperience: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column('simple-array', { nullable: true })
  certifications?: string[];
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TherapistController } from './therapist.controller';
import { TherapistService } from './therapist.service';
import { Therapist } from '../entities/therapist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Therapist])],
  controllers: [TherapistController],
  providers: [TherapistService],
})
export class TherapistModule {}

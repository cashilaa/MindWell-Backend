import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TherapistModule } from './therapist/therapist.module';
import { User } from './entities/user.entity';
import { Therapist } from './entities/therapist.entity';
import { Appointment } from './entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mindwell.db',
      entities: [User, Therapist, Appointment],
      synchronize: true,
    }),
    AuthModule,
    TherapistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('therapists')
export class TherapistController {
  constructor(private therapistService: TherapistService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.therapistService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.therapistService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTherapistDto: any) {
    return this.therapistService.create(createTherapistDto);
  }
}

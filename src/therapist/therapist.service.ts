import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Therapist } from '../entities/therapist.entity';
import { CreateTherapistDto } from './create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';

interface MatchResults {
  primaryConcerns: string[];
  specialties: string[];
  scores: Record<string, number>;
}

@Injectable()
export class TherapistService {
  constructor(
    @InjectRepository(Therapist)
    private therapistRepository: Repository<Therapist>,
  ) {}

  async create(createTherapistDto: CreateTherapistDto): Promise<Therapist> {
    const therapist = this.therapistRepository.create(createTherapistDto);
    return await this.therapistRepository.save(therapist);
  }

  async findAll(): Promise<Therapist[]> {
    return await this.therapistRepository.find();
  }

  async findOne(id: number): Promise<Therapist> {
    return await this.therapistRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTherapistDto: UpdateTherapistDto): Promise<Therapist> {
    await this.therapistRepository.update(id, updateTherapistDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.therapistRepository.delete(id);
  }

  async findMatchingTherapists(matchResults: MatchResults): Promise<Therapist[]> {
    const { primaryConcerns, specialties, scores } = matchResults;

    // Get all therapists
    const allTherapists = await this.therapistRepository.find();

    // Calculate match score for each therapist
    const therapistsWithScores = allTherapists.map(therapist => {
      let matchScore = 0;

      // Score based on primary concerns matching expertise
      primaryConcerns.forEach(concern => {
        if (therapist.expertise.includes(concern)) {
          matchScore += 10;
        }
      });

      // Score based on all relevant specialties
      specialties.forEach(specialty => {
        if (therapist.expertise.includes(specialty)) {
          matchScore += 5;
        }
      });

      // Additional scoring based on therapist's experience with specific issues
      Object.entries(scores).forEach(([concern, score]) => {
        if (therapist.expertise.includes(concern)) {
          matchScore += score;
        }
      });

      // Bonus points for additional qualifications
      if (therapist.certifications?.length > 0) {
        matchScore += 5;
      }

      return {
        therapist,
        matchScore,
      };
    });

    // Sort therapists by match score
    const sortedTherapists = therapistsWithScores
      .sort((a, b) => b.matchScore - a.matchScore)
      .map(({ therapist }) => therapist);

    // Return top matches
    return sortedTherapists.slice(0, 5);
  }
}

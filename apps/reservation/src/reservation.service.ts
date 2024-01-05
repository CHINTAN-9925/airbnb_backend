import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservation/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservation/dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) { }
  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timeStamp: new Date(),
      userId: '123'
    });
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(id: string) {
    return this.reservationRepository.findOne(id);
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdateById(id, updateReservationDto);
  }

  remove(id: string) {
    return this.reservationRepository.findOneAndDeleteById(id);
  }

}

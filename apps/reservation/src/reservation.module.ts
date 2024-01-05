import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '@app/common';
import { ReservationRepository } from './reservation.repository';
import { ReservationDocument, ReservationSchema } from './reservation/schemas/reservation.schemas';

@Module({
  imports: [DatabaseModule,DatabaseModule.forFeture([{name:ReservationDocument.name,schema:ReservationSchema}])],
  controllers: [ReservationController],
  providers: [ReservationService,ReservationRepository],
})
export class ReservationModule {}

import { Injectable, Logger } from "@nestjs/common";
import { ReservationDocument } from "./reservation/schemas/reservation.schemas";
import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ReservationRepository extends AbstractRepository<ReservationDocument>{
    protected readonly logger = new Logger(ReservationRepository.name)

    constructor(
        @InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>
    ) {
        super(reservationModel)
    }
}
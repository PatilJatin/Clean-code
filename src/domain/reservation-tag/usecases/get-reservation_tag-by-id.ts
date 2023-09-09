import { ErrorClass } from "@presentation/error-handling/api-error";
import { ReservationTagEntity, ReservationTagModel } from "../entities/reservation_tag_entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ReservationTagRepository } from "../repositories/reservation_tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface GetReservationTagByIdUsecase {
  execute: (reservationTagId: string) => Promise<Either<ErrorClass, ReservationTagEntity>>;
}

export class GetReservationTagById implements GetReservationTagByIdUsecase {
  private readonly reservationTagRepository: ReservationTagRepository;

  constructor(reservationTagRepository: ReservationTagRepository) {
    this.reservationTagRepository = reservationTagRepository;
  }

  async execute(reservationTagId: string): Promise<Either<ErrorClass, ReservationTagEntity>> {
    return await this.reservationTagRepository.getTagReservationById(reservationTagId);
  }
}


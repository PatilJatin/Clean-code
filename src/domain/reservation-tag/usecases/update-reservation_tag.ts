import { ErrorClass } from "@presentation/error-handling/api-error";
import { ReservationTagEntity, ReservationTagModel } from "../entities/reservation_tag_entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ReservationTagRepository } from "../repositories/reservation_tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface UpdateReservationTagUsecase {
  execute: (
    tagId: string,
    tagData: ReservationTagEntity
  ) => Promise<Either<ErrorClass, ReservationTagEntity>>;
}

export class UpdateReservationTag implements UpdateReservationTagUsecase {
  private readonly reservationTagRepository: ReservationTagRepository;

  constructor(reservationTagRepository: ReservationTagRepository) {
    this.reservationTagRepository = reservationTagRepository;
  }

  async execute(
    reservationTagId: string,
    reservationTagData: ReservationTagEntity
  ): Promise<Either<ErrorClass, ReservationTagEntity>> {
    return await this.reservationTagRepository.updateReservationTag(reservationTagId, reservationTagData);
  }
}

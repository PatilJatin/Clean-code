import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { SeatingAreaEntity, SeatingAreaModel } from "../entities/seatingArea";
import { SeatingAreaRepository } from "../repositories/seatingArea-repository";

export interface CreateSeatingAreaUsecase {
  execute: (
    seatingAreaData: SeatingAreaModel
  ) => Promise<Either<ErrorClass, SeatingAreaEntity>>;
}

export class CreateSeatingArea implements CreateSeatingAreaUsecase {
  private readonly seatingAreaRepository: SeatingAreaRepository;

  constructor(seatingAreaRepository: SeatingAreaRepository) {
    this.seatingAreaRepository = seatingAreaRepository;
  }

  async execute(
    seatingAreaData: SeatingAreaModel
  ): Promise<Either<ErrorClass, SeatingAreaEntity>> {
    return await this.seatingAreaRepository.createSeatingArea(seatingAreaData);
  }
}

import { Either } from "monet";
import { ClientEntity } from "../entities/tag_category_entities"; // Import the ClientEntity
import { ClientRepository } from "../repositories/tag_category-repo"; // Import the ClientRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetClientByIdUsecase {
  execute: (clientID: string) => Promise<Either<ErrorClass, ClientEntity>>;
}

export class GetClientById implements GetClientByIdUsecase {
  private readonly clientRepository: ClientRepository; // Change to ClientRepository

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(clientID: string): Promise<Either<ErrorClass, ClientEntity>> {
    return await this.clientRepository.getClientById(clientID); // Change to getClientById
  }
}

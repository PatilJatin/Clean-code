import { NextFunction, Request, Response } from "express";
import {
    ClientTagEntity,
    ClientTagMapper,
    ClientTagModel,
} from "@domain/client-tag/entities/client_tag_entities"; // Import tag category-related entities and mapper
import { CreateClientTagUsecase } from "@domain/client-tag/usecases/create-client_tags"; // Import tag category-related use cases
import { DeleteClientTagUsecase } from "@domain/client-tag/usecases/delete-client_tags";
import { GetClientTagByIdUsecase } from "@domain/client-tag/usecases/get-client_tag-by-id";
import { GetAllClientagUsecase } from "@domain/client-tag/usecases/get-all-client_tag";
import { UpdateClientTagUsecase } from "@domain/client-tag/usecases/update-client_tag";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class ClientTagServices {
    private readonly createClientTagUsecase: CreateClientTagUsecase;
    private readonly deleteClientTagUsecase: DeleteClientTagUsecase;
    private readonly getClientTagByIdUsecase: GetClientTagByIdUsecase;
    private readonly getAllClientagUsecase: GetAllClientagUsecase;
    private readonly updateClientTagUsecase: UpdateClientTagUsecase;

    constructor(
        createClientTagUsecase: CreateClientTagUsecase,
        deleteClientTagUsecase: DeleteClientTagUsecase,
        getClientTagByIdUsecase: GetClientTagByIdUsecase,
        getAllClientagUsecase: GetAllClientagUsecase,
        updateClientTagUsecase: UpdateClientTagUsecase,
    ) {
        this.createClientTagUsecase = createClientTagUsecase;
        this.deleteClientTagUsecase = deleteClientTagUsecase;
        this.getClientTagByIdUsecase = getClientTagByIdUsecase;
        this.getAllClientagUsecase = getAllClientagUsecase;
        this.updateClientTagUsecase = updateClientTagUsecase;
    }

    async createClientTag(req: Request, res: Response): Promise<void> {
        const clientTagData: ClientTagModel = ClientTagMapper.toModel(req.body);

        const newClientTag: Either<ErrorClass, ClientTagEntity> =
            await this.createClientTagUsecase.execute(clientTagData);

        newClientTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ClientTagEntity) => {
                const resData = ClientTagMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async deleteClientTag(req: Request, res: Response): Promise<void> {
        const clientTagId: string = req.params.ClientTagId;

        const deletedClientTag: Either<ErrorClass, void> =
            await this.deleteClientTagUsecase.execute(clientTagId);

        deletedClientTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.json({ message: "Client Tag deleted successfully." });
            }
        );
    }

    async getClientTagById(req: Request, res: Response): Promise<void> {
        const clientTagId: string = req.params.ClientTagId;

        const clientTag: Either<ErrorClass, ClientTagEntity> =
            await this.getClientTagByIdUsecase.execute(clientTagId);

        clientTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ClientTagEntity) => {
                if (!result) {
                    return res.json({ message: "Client Tag not found." });
                }
                const resData = ClientTagMapper.toEntity(result);
                return res.json(resData);
            }
        );
    }

    async getAllClientTags(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const clientTags: Either<ErrorClass, ClientTagEntity[]> =
            await this.getAllClientagUsecase.execute();

        clientTags.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ClientTagEntity[]) => {
                const responseData = result.map((tag) =>
                    ClientTagMapper.toEntity(tag)
                );
                return res.json(responseData);
            }
        );
    }

    async updateClientTag(req: Request, res: Response): Promise<void> {
        const clientTagId: string = req.params.ClientTagId;
        const clientTagData: ClientTagModel = req.body;

        const existingClientTag: Either<ErrorClass, ClientTagEntity> =
            await this.getClientTagByIdUsecase.execute(clientTagId);

        existingClientTag.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (existingClientTagData: ClientTagEntity) => {
                const updatedClientTagEntity: ClientTagEntity = ClientTagMapper.toEntity(
                    clientTagData,
                    true,
                    existingClientTagData
                );

                const updatedClientTag: Either<ErrorClass, ClientTagEntity> =
                    await this.updateClientTagUsecase.execute(
                        clientTagId,
                        updatedClientTagEntity
                    );

                updatedClientTag.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (result: ClientTagEntity) => {
                        const resData = ClientTagMapper.toEntity(result, true);
                        res.json(resData);
                    }
                );
            }
        );
    }
}

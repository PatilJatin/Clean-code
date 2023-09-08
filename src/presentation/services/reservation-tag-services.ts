import { NextFunction, Request, Response } from "express";
import {
    ReservationTagEntity,
    ReservationTagMapper,
    ReservationTagModel,
} from "@domain/reservation-tag/entities/reservation_tag_entities"; // Import tag category-related entities and mapper
import { CreateReservationTagUsecase } from "@domain/reservation-tag/usecases/create-reservation_tags"; // Import tag category-related use cases
import { DeleteReservationTagUsecase } from "@domain/reservation-tag/usecases/delete-reservation_tags";
import { GetReservationTagByIdUsecase } from "@domain/reservation-tag/usecases/get-reservation_tag-by-id";
import { GetAllReservationtagUsecase } from "@domain/reservation-tag/usecases/get-all-reservation_tag";
import { UpdateReservationTagUsecase } from "@domain/reservation-tag/usecases/update-reservation_tag";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class ReservationTagServices {
    private readonly createReservationTagUsecase: CreateReservationTagUsecase;
    private readonly deleteReservationTagUsecase: DeleteReservationTagUsecase;
    private readonly getReservationTagByIdUsecase: GetReservationTagByIdUsecase;
    private readonly getAllReservationtagUsecase: GetAllReservationtagUsecase;
    private readonly updateReservationTagUsecase: UpdateReservationTagUsecase;

    constructor(
        createReservationTagUsecase: CreateReservationTagUsecase,
        deleteReservationTagUsecase: DeleteReservationTagUsecase,
        getReservationTagByIdUsecase: GetReservationTagByIdUsecase,
        getAllReservationtagUsecase: GetAllReservationtagUsecase,
        updateReservationTagUsecase: UpdateReservationTagUsecase,
    ) {
        this.createReservationTagUsecase = createReservationTagUsecase;
        this.deleteReservationTagUsecase = deleteReservationTagUsecase;
        this.getReservationTagByIdUsecase = getReservationTagByIdUsecase;
        this.getAllReservationtagUsecase = getAllReservationtagUsecase;
        this.updateReservationTagUsecase = updateReservationTagUsecase;
    }

    async createReservationTag(req: Request, res: Response): Promise<void> {
        const reservationTagData: ReservationTagModel = ReservationTagMapper.toModel(req.body);

        const newReservationTag: Either<ErrorClass, ReservationTagEntity> =
            await this.createReservationTagUsecase.execute(reservationTagData);

        newReservationTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ReservationTagEntity) => {
                const resData = ReservationTagMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async deleteReservationTag(req: Request, res: Response): Promise<void> {
        const reservationTagId: string = req.params.ReservationTagId;

        const deletedReservationTag: Either<ErrorClass, void> =
            await this.deleteReservationTagUsecase.execute(reservationTagId);

        deletedReservationTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.json({ message: "Reservation Tag deleted successfully." });
            }
        );
    }

    async getReservationTagById(req: Request, res: Response): Promise<void> {
        const reservationTagId: string = req.params.ReservationTagId;

        const reservationTag: Either<ErrorClass, ReservationTagEntity> =
            await this.getReservationTagByIdUsecase.execute(reservationTagId);

        reservationTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ReservationTagEntity) => {
                if (!result) {
                    return res.json({ message: "Reservation Tag not found." });
                }
                const resData = ReservationTagMapper.toEntity(result);
                return res.json(resData);
            }
        );
    }

    async getAllReservationTags(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const reservationTags: Either<ErrorClass, ReservationTagEntity[]> =
            await this.getAllReservationtagUsecase.execute();

        reservationTags.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ReservationTagEntity[]) => {
                const responseData = result.map((tag) =>
                    ReservationTagMapper.toEntity(tag)
                );
                return res.json(responseData);
            }
        );
    }

    async updateReservationTag(req: Request, res: Response): Promise<void> {
        const reservationTagId: string = req.params.ReservationTagId;
        const reservationTagData: ReservationTagModel = req.body;

        const existingReservationTag: Either<ErrorClass, ReservationTagEntity> =
            await this.getReservationTagByIdUsecase.execute(reservationTagId);

        existingReservationTag.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (reservationTagData: ReservationTagEntity) => {
                const updatedReservationTagEntity: ReservationTagEntity = ReservationTagMapper.toEntity(
                    reservationTagData,
                    true,
                    reservationTagData
                );

                const updatedReservationTag: Either<ErrorClass, ReservationTagEntity> =
                    await this.updateReservationTagUsecase.execute(
                        reservationTagId,
                        updatedReservationTagEntity
                    );

                updatedReservationTag.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (result: ReservationTagEntity) => {
                        const resData = ReservationTagMapper.toEntity(result, true);
                        res.json(resData);
                    }
                );
            }
        );
    }
}

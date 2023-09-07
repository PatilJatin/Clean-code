

export class BlackoutDayModel {
    constructor(
      public date: Date = new Date(),
      public day: string = "",
      public description: string = "",
      public blackout: {
        reservation: boolean;
        guestList: boolean;
      } = {
        reservation: false,
        guestList: false,
      }
    ) {}
  }

  export class BlackoutDayEntity {
    constructor(
      public id: string | undefined = undefined,
      public date: Date,
      public day: string,
      public description: string,
      public blackout: {
        reservation: boolean;
        guestList: boolean;
      }
    ) {}
  }


  export class BlackoutDayMapper {
    static toEntity(
      blackoutData: any,
      includeId?: boolean,
      existingBlackoutDay?: BlackoutDayEntity | null
    ): BlackoutDayEntity {
      if (existingBlackoutDay != null) {
        return {
          ...existingBlackoutDay,
          date:
            blackoutData.Date !== undefined
              ? new Date(blackoutData.date)
              : existingBlackoutDay.date,
          day:
            blackoutData.day !== undefined ? blackoutData.day : existingBlackoutDay.day,
          description:
            blackoutData.description !== undefined
              ? blackoutData.description
              : existingBlackoutDay.description,
          blackout: {
            reservation:
              blackoutData.blackout && blackoutData.blackout.reservation !== undefined
                ? blackoutData.blackout.reservation
                : existingBlackoutDay.blackout.reservation,
            guestList:
              blackoutData.blackout && blackoutData.blackout.guestList !== undefined
                ? blackoutData.blackout.guestList
                : existingBlackoutDay.blackout.guestList,
          },
        };
      } else {
        const blackoutDayEntity: BlackoutDayEntity = {
          id: includeId
            ? blackoutData._id
              ? blackoutData._id.toString()
              : undefined
            : undefined,
          date: new Date(blackoutData.date),
          day: blackoutData.day,
          description: blackoutData.description,
          blackout: {
            reservation: blackoutData.blackout.reservation,
            guestList: blackoutData.blackout.guestList,
          },
        };
        return blackoutDayEntity;
      }
    }
  
    static toModel(blackoutDay: BlackoutDayEntity): BlackoutDayModel {
      return {
        date: blackoutDay.date,
        day: blackoutDay.day,
        description: blackoutDay.description,
        blackout: {
          reservation: blackoutDay.blackout.reservation,
          guestList: blackoutDay.blackout.guestList,
        },
      };
    }
  }
  
  
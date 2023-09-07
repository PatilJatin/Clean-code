import { Document } from "mongoose";

 
 export interface IBlackoutDay extends Document {
    date: Date;
    day: string;
    description: string;
    blackout: {
      reservation: boolean;
      guestList: boolean;
    };
  }
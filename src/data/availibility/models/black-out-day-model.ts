import mongoose, { Document, Schema, Model } from 'mongoose';
import { IBlackoutDay } from 'types/availibility/black-out-type';



const blackoutSchema: Schema<IBlackoutDay> = new Schema<IBlackoutDay>({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  day: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  blackout: {
    reservation: {
      type: Boolean,
      default: false,
    },
    guestList: {
      type: Boolean,
      default: false,
      
    },
  },
});

// Create a model based on the schema
const BlackoutDay: Model<IBlackoutDay> = mongoose.model('BlackoutDay', blackoutSchema);

export default BlackoutDay;

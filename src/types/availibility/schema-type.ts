

import { Document } from 'mongoose';

export interface IShiftProperty extends Document {
    shiftName: string;
    shiftCategory: 'breakfast' | 'brunch' | 'lunch' | 'day' | 'dinner' | 'night';
    startDate: Date;
    endDate: Date | null;
    daysToRepeatThisShift: Array<string>;
    firstSeating: Date;
    lastSeating: Date;
    timeInterval: 15 | 30 | 60;
    floorPlanLayout: string;
    seatingAreasAvailable: Array<'Restaurant' | 'Bar' | 'SushiBar' | 'Prive' | 'PriveBar'>;
    howFarInAdvanceCanReservationsBeBookedInternally:
      | 'Indefinitely'
      | 'HoursInAdvance'
      | 'DaysInAdvance'
      | 'WeeksInAdvance'
      | 'MonthsInAdvance';
    partySizeMin: number;
    partySizeMax: number;
    enforceForUsersWithoutPartySizeOverbookingPermission: boolean;
    durationAverageTurnTimeBasedOnPartySize: Array<{
        partySize: number;
        duration: number;
      }>;
    pacing: number;
    setMaximumTotalCoversForShift: boolean;
    allowDoubleBookingOnSameTables: boolean;
    modifyBookingNotification: 'At Any Time' | 'Never' | 'Up Until Cut-off Time';
    timeBeforeCutOff: number;
    bookingPolicy: 'Default Booking Policy' | 'Custom Policy';
    addSelectableUpgrades: boolean;
  }


  export interface IShift {
    shiftName: string;
    shiftCategory: 'breakfast' | 'brunch' | 'lunch' | 'day' | 'dinner' | 'night';
    startDate: Date;
    endDate: Date | null;
    daysToRepeatThisShift: string[];
    firstSeating: Date;
    lastSeating: Date;
    timeInterval: 15 | 30 | 60;
    floorPlanLayout: string;
    seatingAreasAvailable: ('Restaurant' | 'Bar' | 'SushiBar' | 'Prive' | 'PriveBar')[];
    howFarInAdvanceCanReservationsBeBookedInternally: 'Indefinitely' | 'HoursInAdvance' | 'DaysInAdvance' | 'WeeksInAdvance' | 'MonthsInAdvance';
    partySizeMin: number;
    partySizeMax: number;
    enforceForUsersWithoutPartySizeOverbookingPermission: boolean;
    durationAverageTurnTimeBasedOnPartySize: { partySize: number; duration: number }[];
    pacing: number;
    setMaximumTotalCoversForShift: boolean;
    allowDoubleBookingOnSameTables: boolean;
    modifyBookingNotification: 'At Any Time' | 'Never' | 'Up Until Cut-off Time';
    timeBeforeCutOff: number;
    bookingPolicy: 'Default Booking Policy' | 'Custom Policy';
    addSelectableUpgrades: boolean;
  }


 
  
// import { Schema, model, models, Document, Types } from 'mongoose';

// export interface ITimesheet extends Document {
//   employeeId: Types.ObjectId;
//   designation: string;
//   checktime: Date;
//   status: 'checked-in' | 'checked-out' | 'on-break';
//   duration?: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const TimesheetSchema = new Schema<ITimesheet>(
//   {
//     employeeId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Employee',
//       required: true,
//     },
//     checktime: {
//       type: Date,
//       default: Date.now,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//       default: 'checked-in'
//     },
//     duration: {
//       type: Number,
//       min: 0
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// export const Timesheet = models.Timesheet || model<ITimesheet>('Timesheet', TimesheetSchema);






// models/timesheet.ts

import { Schema, model, models, Document, Types } from 'mongoose';

export interface ITimesheet extends Document {
  employeeId: Types.ObjectId;
  checkInTime: Date;
  checkOutTime?: Date;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'On Leave';
  createdAt: Date;
  updatedAt: Date;
}

const TimesheetSchema = new Schema<ITimesheet>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late', 'On Leave'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 90, // 3 months = 90 days
    },
  },
  {
    timestamps: true,
  }
);

export const Timesheet =
  models.Timesheet || model<ITimesheet>('Timesheet', TimesheetSchema);

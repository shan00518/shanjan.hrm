import { Schema, model, models, Document } from 'mongoose';

export interface ITimesheet extends Document {
  employeeName: string;
  designation: string;
  checktime: Date;
  status: 'checked-in' | 'checked-out' | 'on-break';
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TimesheetSchema = new Schema<ITimesheet>(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true
    },
    designation: {
      type: String,
      required: true,
      trim: true
    },
    checktime: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: String,
      required: true,
      enum: ['checked-in', 'checked-out', 'on-break'],
      default: 'checked-in'
    },
    duration: {
      type: Number,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

export const Timesheet = models.Timesheet || model<ITimesheet>('Timesheet', TimesheetSchema);
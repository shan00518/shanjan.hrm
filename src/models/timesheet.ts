
import mongoose, { Schema, Document } from 'mongoose';

export interface ITimesheet extends Document {
  employeeName: string;
  email: string;
  role: string;
  designation: string;
  type: 'Office' | 'Remote';
  checkInTime: string;
  status: 'On Time' | 'Off Time';
  createdAt: Date;
  updatedAt: Date;
}

const TimesheetSchema: Schema = new Schema({
  employeeName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  designation: { type: String, required: true },
  type: { type: String, enum: ['Office', 'Remote'], required: true },
  checkInTime: { type: String, required: true },
  status: { type: String, enum: ['On Time', 'Off Time'], required: true },
}, {
  timestamps: true
});

export default mongoose.models.Timesheet || mongoose.model<ITimesheet>('Timesheet', TimesheetSchema);
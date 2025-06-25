// import { NextRequest } from 'next/server';
// import { connectDB } from '@/lib/database';
// import { success, badRequest, internalServerError } from '@/lib/response-mapper';
// import { Timesheet } from '@/models/timesheet';

// export async function POST(req: NextRequest) {
//   await connectDB();

//   try {
//     const body = await req.json();
//     const { employeeId, checktime, status } = body;

//     if (!employeeId) {
//       return badRequest('Employee ID is required');
//     }
  
//     if (!checktime) {
//       return badRequest('Check time is required');
//     }
//     if (!status) {
//       return badRequest('Please add the status!');
//     }

//     const payload = {
//       employeeId: employeeId,
//       checktime: new Date(checktime),
//       status
//     };

//     const newTimesheet = await Timesheet.create(payload);
//     return success({ timesheet: newTimesheet }, 'Timesheet created successfully');
//   } catch (err) {
//     console.error('Error creating timesheet:', err);
//     return internalServerError(err instanceof Error ? err.message : 'Unknown error');
//   }
// }





/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/database';
import { Timesheet, ITimesheet } from '@/models/timesheet';
import {
  success,
  badRequest,
  internalServerError,
} from '@/lib/response-mapper';
import { Types } from 'mongoose';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { employeeId, checkInTime, checkOutTime, date, status } = body;

   
    if (!employeeId || !checkInTime || !date || !status) {
      return badRequest('employeeId, checkInTime, date, and status are required');
    }

   
    const validStatuses: ITimesheet['status'][] = [
      'Present',
      'Absent',
      'Late',
      'On Leave',
    ];
    if (!validStatuses.includes(status)) {
      return badRequest('Invalid status value');
    }

    
    const payload: Partial<ITimesheet> = {
      employeeId: new Types.ObjectId(employeeId),
      checkInTime: new Date(checkInTime),
      checkOutTime: checkOutTime ? new Date(checkOutTime) : undefined,
      date,
      status,
    };

    const newEntry = await Timesheet.create(payload);
    return success({ entry: newEntry }, 'Timesheet entry created successfully');
  } catch (err: any) {
    return internalServerError(err.message || 'Server error');
  }
}

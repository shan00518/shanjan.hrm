// File: app/api/timesheet/update/route.ts

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import { Timesheet } from '@/models/timesheet';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    const { id } = params;
    const { checktime, status, duration } = await request.json();

    // Validate input
    if (!checktime || !status) {
      return NextResponse.json(
        { error: 'Checktime and status are required fields' },
        { status: 400 }
      );
    }

    // Convert checktime string to Date object
    const checktimeDate = new Date(checktime);
    if (isNaN(checktimeDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format for checktime' },
        { status: 400 }
      );
    }

    // Find the existing timesheet entry
    const existingEntry = await Timesheet.findById(id);
    if (!existingEntry) {
      return NextResponse.json(
        { error: 'Timesheet entry not found' },
        { status: 404 }
      );
    }

    // Update the entry
    const updatedEntry = await Timesheet.findByIdAndUpdate(
      id,
      {
        checktime: checktimeDate,
        status,
        duration: duration || existingEntry.duration,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      timesheet: updatedEntry,
    });
  } catch (error) {
    console.error('Error updating timesheet:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
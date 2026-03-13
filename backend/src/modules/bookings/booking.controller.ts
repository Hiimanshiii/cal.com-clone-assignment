import { Request, Response } from 'express';
import { cancelBooking, createBooking, getBookingsByEventType } from './booking.service';
import { sendBookingConfirmationEmail, sendBookingCancellation } from '../../utils/email';
import { generateMeetingLink } from '../../utils/meeting';

export const createBookingHandler = async (req: Request, res: Response) => {
  try {
    const {
      event_type_id,
      user_id,
      name,
      email,
      start_time,
      end_time,
      status,
      custom_answers,
    } = req.body;

    if (
      !event_type_id ||
      !user_id ||
      !name ||
      !email ||
      !start_time ||
      !end_time
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const start = new Date(start_time);
    const end = new Date(end_time);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid datetime format',
      });
    }

    const booking = await createBooking({
      event_type_id: Number(event_type_id),
      user_id: Number(user_id),
      name,
      email,
      start_time: start,
      end_time: end,
      status: status || 'confirmed',
      custom_answers: custom_answers || null,
    });

    const meetingUrl = generateMeetingLink(booking.id);
    
    // Add meeting link to response object dynamically without breaking DB
    (booking as any).meeting_url = meetingUrl;

    // Fire & forget email
    sendBookingConfirmationEmail(
      booking.email,
      booking.name,
      'Meeting Scheduled',
      start.toLocaleDateString(),
      start.toLocaleTimeString(),
      meetingUrl
    ).catch(e => console.error(e));

    return res.status(201).json({
      success: true,
      data: booking,
    });

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingsByEventTypeHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const { eventTypeId } = req.query;

    const id = Number(eventTypeId);

    if (!eventTypeId || Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid eventTypeId query parameter is required',
      });
    }

    const bookings = await getBookingsByEventType(id);

    return res.json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelBookingHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid booking id is required',
      });
    }

    const booking = await cancelBooking(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Fire & forget email
    sendBookingCancellation(
      booking.email,
      booking.name,
      'Meeting Canceled',
      new Date(booking.start_time).toLocaleString()
    ).catch(e => console.error(e));

    return res.json({
      success: true,
      message: 'Booking cancelled',
      data: booking,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
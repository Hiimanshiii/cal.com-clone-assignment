import type { Request, Response, NextFunction } from 'express';
import { getAvailableSlotsBySlugAndDate } from './slots.service';

export const getSlotsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const { date } = req.query;

    if (!slug) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Slug is required',
      });
    }

    if (!date || typeof date !== 'string') {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'date query parameter (YYYY-MM-DD) is required',
      });
    }

    const requestDate = new Date(date);
    if (Number.isNaN(requestDate.getTime())) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Invalid date format, expected YYYY-MM-DD',
      });
    }

    const slots = await getAvailableSlotsBySlugAndDate(slug, date);

    if (slots === null) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Event type not found',
      });
    }

    return res.json({
      success: true,
      data: slots,
    });
  } catch (error) {
    next(error);
  }
};


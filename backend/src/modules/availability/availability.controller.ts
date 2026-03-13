import type { Request, Response, NextFunction } from 'express';
import {
  createAvailability,
  getAvailabilityByUser,
  updateAvailability,
  deleteAvailability,
  InvalidTimeRangeError,
} from './availability.service';

export const getAvailabilityHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number((req as any).user?.id ?? req.params.userId ?? req.query.userId);

    if (!userId || Number.isNaN(userId)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'User id is required',
      });
    }

    const availability = await getAvailabilityByUser(userId);

    return res.json({
      success: true,
      data: availability,
    });
  } catch (error) {
    next(error);
  }
};

export const createAvailabilityHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number((req as any).user?.id ?? req.body.user_id);

    if (!userId || Number.isNaN(userId)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'User id is required',
      });
    }

    const { day_of_week, start_time, end_time } = req.body;

    if (
      day_of_week === undefined ||
      start_time === undefined ||
      end_time === undefined
    ) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'day_of_week, start_time and end_time are required',
      });
    }

    const created = await createAvailability({
      user_id: userId,
      day_of_week: Number(day_of_week),
      start_time,
      end_time,
    });

    return res.status(201).json({
      success: true,
      data: created,
    });
  } catch (error) {
    if (error instanceof InvalidTimeRangeError) {
      return res.status(400).json({
        success: false,
        data: null,
        message: error.message,
      });
    }

    next(error);
  }
};

export const updateAvailabilityHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Valid availability id is required',
      });
    }

    const { day_of_week, start_time, end_time } = req.body;

    const updated = await updateAvailability(id, {
      day_of_week:
        day_of_week !== undefined ? Number(day_of_week) : undefined,
      start_time,
      end_time,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Availability not found',
      });
    }

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    if (error instanceof InvalidTimeRangeError) {
      return res.status(400).json({
        success: false,
        data: null,
        message: error.message,
      });
    }

    next(error);
  }
};

export const deleteAvailabilityHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Valid availability id is required',
      });
    }

    const deleted = await deleteAvailability(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Availability not found',
      });
    }

    return res.json({
      success: true,
      data: { deleted: true },
    });
  } catch (error) {
    next(error);
  }
};


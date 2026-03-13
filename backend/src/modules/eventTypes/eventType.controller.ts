import type { Request, Response, NextFunction } from 'express';

import {
  createEventType,
  getEventTypesByUser,
  getEventTypeBySlug,
  updateEventType,
  deleteEventType,
  DuplicateSlugError,
} from './eventType.service';

export const getEventTypesHandler = async (
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

    const eventTypes = await getEventTypesByUser(userId);

    return res.json({
      success: true,
      data: eventTypes,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventTypeBySlugHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Slug is required',
      });
    }

    const eventType = await getEventTypeBySlug(slug);

    if (!eventType) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Event type not found',
      });
    }

    return res.json({
      success: true,
      data: eventType,
    });
  } catch (error) {
    next(error);
  }
};

export const createEventTypeHandler = async (
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

    const { title, description, duration_minutes, slug } = req.body;

    if (!title || !duration_minutes || !slug) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'title, duration_minutes and slug are required',
      });
    }

    const created = await createEventType({
      user_id: userId,
      title,
      description: description ?? null,
      duration_minutes: Number(duration_minutes),
      slug,
    });

    return res.status(201).json({
      success: true,
      data: created,
    });
  } catch (error) {
    if (error instanceof DuplicateSlugError) {
      return res.status(409).json({
        success: false,
        data: null,
        message: error.message,
      });
    }

    next(error);
  }
};

export const updateEventTypeHandler = async (
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
        message: 'Valid event type id is required',
      });
    }

    const { title, description, duration_minutes, slug } = req.body;

    const updated = await updateEventType(id, {
      title,
      description,
      duration_minutes:
        duration_minutes !== undefined ? Number(duration_minutes) : undefined,
      slug,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Event type not found',
      });
    }

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    if (error instanceof DuplicateSlugError) {
      return res.status(409).json({
        success: false,
        data: null,
        message: error.message,
      });
    }

    next(error);
  }
};

export const deleteEventTypeHandler = async (
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
        message: 'Valid event type id is required',
      });
    }

    const deleted = await deleteEventType(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Event type not found',
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
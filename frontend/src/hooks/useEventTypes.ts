import { useEffect } from 'react';
import { eventTypesApi } from '../services/api/eventTypesApi';
import { useAsync } from './useAsync';
import { SESSION } from '../store/session';
import type { EventType } from '../types/domain';

export const useEventTypes = () => {
  const { data, error, isLoading, run, setData } = useAsync<
    [number],
    EventType[]
  >(eventTypesApi.listByUser);

  useEffect(() => {
    run(SESSION.userId).catch(() => {});
  }, [run]);

  return {
    eventTypes: data ?? [],
    error,
    isLoading,
    refresh: () => run(SESSION.userId),
    setEventTypes: setData,
  };
};


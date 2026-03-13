import { useCallback, useState } from 'react';

export const useAsync = <TArgs extends any[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
) => {
  const [data, setData] = useState<TResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(
    async (...args: TArgs) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fn(...args);
        setData(result);
        return result;
      } catch (e: any) {
        setError(e?.message ?? 'Something went wrong');
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [fn],
  );

  return { data, error, isLoading, run, setData };
};


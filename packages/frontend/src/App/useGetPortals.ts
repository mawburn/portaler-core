import { useCallback, useEffect, useRef, useState } from 'react';

import { Portal } from '../types';

const fetchPortals = (token: string) =>
  fetch(`/api/portal`, {
    headers: {
      'X-Tebro-Auth': token,
    },
  }).then((r) => r.json());

const useGetPortals = (
  token: string,
  isPublic?: boolean
): [Portal[], () => void] => {
  const lastUpdate = useRef<Date>(new Date());
  const [portals, setPortals] = useState<Portal[]>([]);

  useEffect(() => {
    if (token !== '' || isPublic) {
      fetchPortals(token).then(setPortals);
    }
  }, [token, isPublic]);

  const updatePortals = useCallback(async () => {
    const res = await fetchPortals(token);
    lastUpdate.current = new Date();
    setPortals(res);
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - lastUpdate.current.getTime();

      if (diff > 10000) {
        updatePortals();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [updatePortals]);

  return [portals, updatePortals];
};

export default useGetPortals;

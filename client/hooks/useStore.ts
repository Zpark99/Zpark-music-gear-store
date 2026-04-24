// hooks/useStore.ts
import { useState, useEffect } from 'react';

// SSR 환경에서 Zustand persist 데이터 불일치(Hydration) 에러를 방어하는 커스텀 훅
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
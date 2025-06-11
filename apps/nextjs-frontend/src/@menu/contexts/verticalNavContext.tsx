'use client';

// React Imports
import {createContext, useCallback, useMemo, useState} from 'react';

// Type Imports
import type {ChildrenType} from '../types';

export type VerticalNavState = {
  width?: number;
  isToggled?: boolean;
  isBreakpointReached?: boolean;
  transitionDuration?: number;
};

export type VerticalNavContextProps = VerticalNavState & {
  updateVerticalNavState: (values: VerticalNavState) => void;
  toggleVerticalNav: (value?: VerticalNavState['isToggled']) => void;
};

const VerticalNavContext = createContext({} as VerticalNavContextProps);

export function VerticalNavProvider({children}: ChildrenType) {
  // States
  const [verticalNavState, setVerticalNavState] = useState<VerticalNavState>();

  // Hooks
  const updateVerticalNavState = useCallback((values: Partial<VerticalNavState>) => {
    setVerticalNavState((prevState) => ({
      ...prevState,
      ...values,
    }));
  }, []);

  const toggleVerticalNav = useCallback((value?: boolean) => {
    setVerticalNavState((prevState) => ({
      ...prevState,
      isToggled: value === undefined ? !prevState?.isToggled : Boolean(value),
    }));
  }, []);

  const verticalNavProviderValue = useMemo(
    () => ({
      ...verticalNavState,
      updateVerticalNavState,
      toggleVerticalNav,
    }),
    [verticalNavState, updateVerticalNavState, toggleVerticalNav],
  );

  return <VerticalNavContext.Provider value={verticalNavProviderValue}>{children}</VerticalNavContext.Provider>;
}

export default VerticalNavContext;

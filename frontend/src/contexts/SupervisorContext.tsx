// src/contexts/SupervisorContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Supervisor } from '../types/supervisorTypes';

interface SupervisorContextType {
  supervisor: Supervisor | null;
  setSupervisor: React.Dispatch<React.SetStateAction<Supervisor | null>>;
}

const SupervisorContext = createContext<SupervisorContextType | undefined>(undefined);

export const SupervisorProvider = ({ children }: { children: React.ReactNode }) => {
  const [supervisor, setSupervisor] = useState<Supervisor | null>(null);

  return (
    <SupervisorContext.Provider value={{ supervisor, setSupervisor }}>
      {children}
    </SupervisorContext.Provider>
  );
};

export const useSupervisor = () => {
  const context = useContext(SupervisorContext);
  if (!context) {
    throw new Error('useSupervisor must be used within a SupervisorProvider');
  }
  return context;
};

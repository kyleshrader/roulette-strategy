import { useContext, createContext, useState, ReactNode } from "react";

type SimulationProviderProps = {
  children: ReactNode;
};

type SimulationContextTypes = {
  budgetValue: number;
  stakeValue: number;
  spinTime: number;
  currentBalance: number;
  spinNumber: number;
  currentStake: number;
  highestStake: number;
  lowestBalance: number;
  simulationSpeed: number;
  timeStamp: number;
  simulationRunning: boolean;
  setBudgetValue: (value: number) => void;
  setStakeValue: (value: number) => void;
  setSpinTime: (value: number) => void;
  setCurrentBalance: (value: number) => void;
  setSpinNumber: (value: number) => void;
  setCurrentStake: (value: number) => void;
  setHighestStake: (value: number) => void;
  setLowestBalance: (value: number) => void;
  setSimulationSpeed: (value: number) => void;
  setTimeStamp: (value: number) => void;
  setSimulationRunning: (value: boolean) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
};

const SimulationContext = createContext({} as SimulationContextTypes);

export const useSimulationContext = () => {
  return useContext(SimulationContext);
};

export const SimulationProvider = ({ children }: SimulationProviderProps) => {
  const [budgetValue, setBudgetValue] = useState(10000);
  const [stakeValue, setStakeValue] = useState(50);
  const [spinTime, setSpinTime] = useState(30);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [spinNumber, setSpinNumber] = useState(0);
  const [currentStake, setCurrentStake] = useState(0);
  const [highestStake, setHighestStake] = useState(0);
  const [lowestBalance, setLowestBalance] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(2000);
  const [timeStamp, setTimeStamp] = useState(Date.now());
  const [simulationRunning, setSimulationRunning] = useState(false);

  const startSimulation = () => {
    setSimulationRunning(true);
  };

  const stopSimulation = () => {
    setSimulationRunning(false);
  };

  return (
    <SimulationContext.Provider
      value={{
        budgetValue,
        setBudgetValue,
        stakeValue,
        setStakeValue,
        spinTime,
        setSpinTime,
        currentBalance,
        setCurrentBalance,
        spinNumber,
        setSpinNumber,
        currentStake,
        setCurrentStake,
        highestStake,
        setHighestStake,
        lowestBalance,
        setLowestBalance,
        simulationSpeed,
        setSimulationSpeed,
        timeStamp,
        setTimeStamp,
        simulationRunning,
        setSimulationRunning,
        startSimulation,
        stopSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

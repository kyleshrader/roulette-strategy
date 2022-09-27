import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { americanRoulette, europeanRoulette } from "../assets/Roulettes";

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
  simulationMessage: string;
  intervalId: number;
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
  runSimulation: () => void;
  setSimulationMessage: (value: string) => void;
  setIntervalId: (value: number) => void;
};

const SimulationContext = createContext({} as SimulationContextTypes);

export const useSimulationContext = () => {
  return useContext(SimulationContext);
};

export const SimulationProvider = ({ children }: SimulationProviderProps) => {
  // INPUT VALUES
  const [budgetValue, setBudgetValue] = useState(150);
  const [stakeValue, setStakeValue] = useState(50);
  const [spinTime, setSpinTime] = useState(30);
  const [simulationSpeed, setSimulationSpeed] = useState(1000);
  // OUTPUT VALUES
  const [currentBalance, setCurrentBalance] = useState(0);
  const [spinNumber, setSpinNumber] = useState(0);
  const [currentStake, setCurrentStake] = useState(0);
  const [highestStake, setHighestStake] = useState(0);
  const [lowestBalance, setLowestBalance] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationMessage, setSimulationMessage] = useState("");

  // HELPERS
  const [intervalId, setIntervalId] = useState(0);
  const rendersNumber = useRef(1);

  useEffect(() => {
    if (simulationRunning) {
      const newIntervalId = setInterval(runSimulation, simulationSpeed); //get new interval ID
      setIntervalId(newIntervalId); // save interval ID for clearing purposes
    }
    return () => clearInterval(intervalId);
  }, [simulationRunning, simulationSpeed]);

  useEffect(() => {
    console.log(rendersNumber.current);
    rendersNumber.current++;
  });

  const runSimulation = () => {
    if (currentBalance < currentStake) {
      setSimulationMessage("Bankrupt");
      stopSimulation();
      return;
    } else {
      setSpinNumber((prevSpinNumber) => prevSpinNumber + 1);
      setCurrentBalance(
        (prevCurrentBalance) => prevCurrentBalance - currentStake
      );
    }
  };

  const startSimulation = () => {
    setSimulationRunning(true);
    setSpinNumber(0);
    setCurrentBalance(budgetValue);
    setCurrentStake(stakeValue);
    setHighestStake(stakeValue);
    setLowestBalance(budgetValue);
  };

  const stopSimulation = () => {
    clearInterval(intervalId);
    setSimulationRunning(false);
    return;
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
        runSimulation,
        simulationMessage,
        setSimulationMessage,
        intervalId,
        setIntervalId,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

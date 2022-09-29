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
  simulationSpeed: number;
  rouletteType: string;
  spinNumber: number;
  strategy: string;
  losingStreak: number;
  currentBalance: { current: number };
  currentStake: { current: number };
  highestStake: { current: number };
  lowestBalance: { current: number };
  startTimeStamp: { current: number };
  simulationRunning: boolean;
  simulationMessage: string;
  intervalId: number;
  virtualTime: { current: number };
  highestLosingStreak: { current: number };
  setBudgetValue: (value: number) => void;
  setStakeValue: (value: number) => void;
  setSpinTime: (value: number) => void;
  setSimulationSpeed: (value: number) => void;
  setStrategy: (value: string) => void;
  setRouletteType: (value: string) => void;
  setSpinNumber: (value: number) => void;
  setSimulationRunning: (value: boolean) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  runSimulation: () => void;
  setSimulationMessage: (value: string) => void;
};

const SimulationContext = createContext({} as SimulationContextTypes);

const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const useSimulationContext = () => {
  return useContext(SimulationContext);
};

export const SimulationProvider = ({ children }: SimulationProviderProps) => {
  // INPUT VALUES
  const [budgetValue, setBudgetValue] = useState(1500);
  const [stakeValue, setStakeValue] = useState(50);
  const [spinTime, setSpinTime] = useState(30);
  const [simulationSpeed, setSimulationSpeed] = useState(400);
  const [rouletteType, setRouletteType] = useState("europeanRoulette");
  const [strategy, setStrategy] = useState("martingale");

  // OUTPUT VALUES
  const [spinNumber, setSpinNumber] = useState(0);
  const currentBalance = useRef(0);
  const currentStake = useRef(0);
  const highestStake = useRef(0);
  const lowestBalance = useRef(0);
  const startTimeStamp = useRef(Date.now());
  const virtualTime = useRef(0);
  const highestLosingStreak = useRef(0);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationMessage, setSimulationMessage] = useState("");

  // HELPERS
  let losingStreak = 0;
  const bettingOn = useRef("black");
  let intervalId = 0;

  useEffect(() => {
    if (simulationRunning) {
      intervalId = setInterval(runSimulation, simulationSpeed); // get and save new interval ID
    }
    return () => {
      if (simulationRunning) {
        clearInterval(intervalId); // clear outdated interval on dismount
      }
    };
  }, [simulationRunning, simulationSpeed]);

  const runSimulation = () => {
    const roulette =
      rouletteType === "europeanRoulette" ? europeanRoulette : americanRoulette;

    // losing condition
    if (currentBalance.current - currentStake.current < 0) {
      setSimulationMessage("You've run out of money...");
      stopSimulation();
      return;
    }
    // gameplay
    setSpinNumber((prevSpinNumber) => prevSpinNumber + 1);
    virtualTime.current += spinTime * 1000; // in ms
    const randomizedNumber = getRandomInteger(0, roulette.length);
    // won spin
    if (bettingOn.current === roulette[randomizedNumber].color) {
      currentBalance.current += currentStake.current;
      currentStake.current = stakeValue;
      losingStreak = 0;
    }
    // lost spin
    if (bettingOn.current !== roulette[randomizedNumber].color) {
      currentBalance.current -= currentStake.current;
      currentStake.current = currentStake.current * 2;
      losingStreak++;
      if (losingStreak > highestLosingStreak.current)
        highestLosingStreak.current = losingStreak;
      if (currentStake.current > highestStake.current)
        highestStake.current = currentStake.current;
      if (currentBalance.current < lowestBalance.current)
        lowestBalance.current = currentBalance.current;
    }
  };

  const startSimulation = () => {
    setSimulationRunning(true);
    setSpinNumber(0);
    virtualTime.current = 0;
    highestLosingStreak.current = 0;
    losingStreak = 0;
    currentBalance.current = budgetValue;
    currentStake.current = stakeValue;
    highestStake.current = stakeValue;
    lowestBalance.current = budgetValue;
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
        spinNumber,
        setSpinNumber,
        currentStake,
        highestStake,
        lowestBalance,
        simulationSpeed,
        setSimulationSpeed,
        startTimeStamp,
        simulationRunning,
        setSimulationRunning,
        startSimulation,
        stopSimulation,
        runSimulation,
        simulationMessage,
        setSimulationMessage,
        rouletteType,
        setRouletteType,
        virtualTime,
        losingStreak,
        intervalId,
        highestLosingStreak,
        strategy,
        setStrategy,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

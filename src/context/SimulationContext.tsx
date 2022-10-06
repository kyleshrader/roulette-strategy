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

type DataRow = {
  spin: number;
  drawnNumber: { id: number; value: string; color: string };
  balance: number;
  lowestBalance: number;
  stake: number;
};

type SimulationContextTypes = {
  //INPUT
  budgetValue: number;
  stakeValue: number;
  spinTime: number;
  simulationSpeed: number;
  rouletteType: string;
  spinNumber: number;
  strategy: string;
  losingStreak: number;
  winningTarget: number;
  sequence: { current: number[] };
  initialSequence: { current: number[] };
  //OUTPUT
  currentBalance: { current: number };
  currentStake: { current: number };
  highestStake: { current: number };
  lowestBalance: { current: number };
  startTimeStamp: { current: number };
  simulationRunning: boolean;
  simulationMessage: {
    result: string;
    bettingOn: string;
  };
  intervalId: number;
  virtualTime: { current: number };
  highestLosingStreak: { current: number };
  targetSequenceDiff: number;
  displayDrawnNumber: {
    current: {
      id: number;
      color: string;
      value: string;
    };
  };
  historyData: DataRow[] | null;

  //INPUT
  setBudgetValue: (value: number) => void;
  setStakeValue: (value: number) => void;
  setSpinTime: (value: number) => void;
  setWinningTarget: (value: number) => void;
  setSimulationSpeed: (value: number) => void;
  setStrategy: (value: string) => void;
  setRouletteType: (value: string) => void;
  setTargetSequenceDiff: (value: number) => void;
  //OUTPUT
  setSpinNumber: (value: number) => void;
  setSimulationRunning: (value: boolean) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  runSimulation: () => void;
  setSimulationMessage: (value: { result: string; bettingOn: string }) => void;
  setHistoryData: (value: DataRow[]) => void;
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
  const [winningTarget, setWinningTarget] = useState(100);
  const [rouletteType, setRouletteType] = useState("europeanRoulette");
  const [strategy, setStrategy] = useState<string>("martingale");
  const sequence = useRef<number[]>([]);

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
  const bettingOn = useRef("black");
  const [simulationMessage, setSimulationMessage] = useState({
    result: "",
    bettingOn: bettingOn.current,
  });
  const displayDrawnNumber = useRef({ id: 0, color: "green", value: "0" });
  const [historyData, setHistoryData] = useState<DataRow[] | null>(null);

  // HELPERS
  const initialSequence = useRef<number[]>([]);
  let losingStreak: number = 0;
  let intervalId: number = 0;

  const [targetSequenceDiff, setTargetSequenceDiff] = useState(0);

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
      setSimulationMessage({
        ...simulationMessage,
        result: "You've run out of money...",
      });
      stopSimulation();
      return;
    }
    // gameplay
    setSpinNumber((prevSpinNumber) => prevSpinNumber + 1);
    virtualTime.current += spinTime * 1000; // in ms
    const randomizedNumber = getRandomInteger(0, roulette.length);
    displayDrawnNumber.current = { ...roulette[randomizedNumber] };
    switch (strategy) {
      case "martingale":
        // won spin
        if (bettingOn.current === roulette[randomizedNumber].color) {
          losingStreak = 0;
          currentBalance.current += currentStake.current;
          currentStake.current = stakeValue;
          setSimulationMessage({
            ...simulationMessage,
            result: "Good! You are lucky",
          });
        }
        // lost spin
        if (bettingOn.current !== roulette[randomizedNumber].color) {
          losingStreak++;
          currentBalance.current -= currentStake.current;
          currentStake.current = currentStake.current * 2;
          setSimulationMessage({
            ...simulationMessage,
            result: "This bet was unlucky...",
          });
          if (losingStreak > highestLosingStreak.current)
            highestLosingStreak.current = losingStreak;
          if (currentStake.current > highestStake.current)
            highestStake.current = currentStake.current;
          if (currentBalance.current < lowestBalance.current)
            lowestBalance.current = currentBalance.current;
        }
        break;
      case "labouchere":
        // won spin
        if (bettingOn.current === roulette[randomizedNumber].color) {
          losingStreak = 0;
          currentBalance.current += currentStake.current; //add stake to balance
          sequence.current.shift(); // remove first element
          sequence.current.pop(); // remove last element

          //winning target accomplished, sequence list is empty
          if (sequence.current.length === 0) {
            setSimulationMessage({
              ...simulationMessage,
              result: "Great! You have reached your target!",
            });
            stopSimulation();
            return;
          }
          if (sequence.current.length === 1)
            currentStake.current = sequence.current[0];
          else
            currentStake.current =
              sequence.current[0] +
              sequence.current[sequence.current.length - 1];
        }
        // lost spin
        if (bettingOn.current !== roulette[randomizedNumber].color) {
          losingStreak++;
          setSimulationMessage({
            ...simulationMessage,
            result: "This bet was unlucky...",
          });
          currentBalance.current -= currentStake.current;
          sequence.current.push(currentStake.current);
          currentStake.current =
            sequence.current[0] + sequence.current[sequence.current.length - 1];
          if (losingStreak > highestLosingStreak.current)
            highestLosingStreak.current = losingStreak;
          if (currentStake.current > highestStake.current)
            highestStake.current = currentStake.current;
          if (currentBalance.current < lowestBalance.current)
            lowestBalance.current = currentBalance.current;
        }
        break;
      default:
        throw new Error("Strategy not recognized.");
    }
    setHistoryData((prevData) => [
      ...prevData!,
      {
        spin: prevData!.length || 0,
        balance: currentBalance.current,
        lowestBalance: lowestBalance.current,
        stake: currentStake.current,
        drawnNumber: { ...roulette[randomizedNumber] },
      },
    ]);
  };

  const startSimulation = () => {
    setSimulationRunning(true);
    setSpinNumber(0);
    setHistoryData([]);
    setSimulationMessage({
      ...simulationMessage,
      result: "Starting up",
    });
    virtualTime.current = 0;
    highestLosingStreak.current = 0;
    losingStreak = 0;
    currentBalance.current = budgetValue;
    currentStake.current = stakeValue;
    if (strategy === "labouchere") {
      initialSequence.current = Array.from(sequence.current); //copying initial sequence
      if (sequence.current.length === 1)
        currentStake.current = sequence.current[0];
      else
        currentStake.current =
          sequence.current[0] + sequence.current[sequence.current.length - 1];
    }
    highestStake.current = currentStake.current;
    lowestBalance.current = budgetValue;
    setHistoryData([
      {
        spin: 0,
        balance: currentBalance.current,
        lowestBalance: lowestBalance.current,
        stake: currentStake.current,
        drawnNumber: { id: 0, color: "N/A", value: "N/A" },
      },
    ]);
  };

  const stopSimulation = () => {
    sequence.current = Array.from(initialSequence.current); //returning to initial sequence
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
        winningTarget,
        setWinningTarget,
        sequence,
        targetSequenceDiff,
        setTargetSequenceDiff,
        initialSequence,
        displayDrawnNumber,
        historyData,
        setHistoryData,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

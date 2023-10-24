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
  highestBalance: number;
  stake: number;
};

type SimulationContextTypes = {
  //INPUT
  budgetValue: number;
  stakeValue: number;
  spinTime: number;
  simulationSpeed: number;
  betWinnings: boolean;
  stopLoss: number;
  stopWin: number;
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
  currentBonusStake: { current: number };
  highestStake: { current: number };
  lowestBalance: { current: number };
  highestBalance: { current: number };
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
  simulationHistory: DataRow[][] | null;

  //INPUT
  setBudgetValue: (value: number) => void;
  setStakeValue: (value: number) => void;
  setSpinTime: (value: number) => void;
  setWinningTarget: (value: number) => void;
  setSimulationSpeed: (value: number) => void;
  setBetWinnings: (value: boolean) => void;
  setStopLoss: (value: number) => void;
  setStopWin: (value: number) => void;
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
  setSimulationHistory: (value: DataRow[][]) => void;
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
  const [budgetValue, setBudgetValue] = useState(2000);
  const [stakeValue, setStakeValue] = useState(5);
  const [spinTime, setSpinTime] = useState(180);
  const [simulationSpeed, setSimulationSpeed] = useState(980);
  const [betWinnings, setBetWinnings] = useState(true);
  const [stopLoss, setStopLoss] = useState(0);
  const [stopWin, setStopWin] = useState(0);
  const [winningTarget, setWinningTarget] = useState(100);
  const [rouletteType, setRouletteType] = useState("americanRoulette");
  const [strategy, setStrategy] = useState<string>("martingale");
  const sequence = useRef<number[]>([]);

  // OUTPUT VALUES
  const [spinNumber, setSpinNumber] = useState(0);
  const currentBalance = useRef(0);
  const currentStake = useRef(0);
  const currentBonusStake = useRef(0);
  const highestStake = useRef(0);
  const lowestBalance = useRef(0);
  const highestBalance = useRef(0);
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
  const [simulationHistory, setSimulationHistory] = useState<DataRow[][] | null>([]);

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

    // stop conditions
    if (stopLoss > 0 && budgetValue - currentBalance.current >= stopLoss) {
      // lost more than stopLoss
      setSimulationMessage({
        ...simulationMessage,
        result: "You've hit your stop loss...",
      });
      stopSimulation();
      return;
    }

    if (stopWin > 0 && currentBalance.current - budgetValue >= stopWin) {
      // won more than stopWin
      setSimulationMessage({
        ...simulationMessage,
        result: "You've hit your stop win...",
      });
      stopSimulation();
      return;
    }

    // losing condition
    if (currentBalance.current - currentStake.current < 0) {
      setSimulationMessage({
        ...simulationMessage,
        result: "You can't afford your next bet...",
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
        const winnings = currentBalance.current - budgetValue;
        currentBonusStake.current = winnings > 0 && betWinnings ? winnings : 0;
        // won spin
        if (bettingOn.current === roulette[randomizedNumber].color) {
          losingStreak = 0;
          currentBalance.current += currentStake.current + currentBonusStake.current;
          currentStake.current = stakeValue;
          setSimulationMessage({
            ...simulationMessage,
            result: "Good! You are lucky",
          });
          if (currentBalance.current > highestBalance.current)
            highestBalance.current = currentBalance.current;
        }
        // lost spin
        if (bettingOn.current !== roulette[randomizedNumber].color) {
          losingStreak++;
          currentBalance.current -= currentStake.current + currentBonusStake.current;
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

          if (currentBalance.current > highestBalance.current)
            highestBalance.current = currentBalance.current;
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
        highestBalance: highestBalance.current,
        stake: currentStake.current + currentBonusStake.current,
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
    highestBalance.current = budgetValue;
    setHistoryData([
      {
        spin: 0,
        balance: currentBalance.current,
        lowestBalance: lowestBalance.current,
        highestBalance: highestBalance.current,
        stake: currentStake.current,
        drawnNumber: { id: 0, color: "N/A", value: "N/A" },
      },
    ]);
  };

  const stopSimulation = () => {
    let latestHistory: DataRow[] = []
    setHistoryData(prevData => {
      latestHistory = prevData || []
      return prevData;
    })
    setSimulationHistory(prevData => {
      const newData = [...prevData!, latestHistory]
      console.log(newData)
      return newData;
    })
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
        currentBonusStake,
        highestStake,
        lowestBalance,
        highestBalance,
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
        betWinnings,
        setBetWinnings,
        stopLoss,
        setStopLoss,
        stopWin,
        setStopWin,
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
        simulationHistory,
        setSimulationHistory,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

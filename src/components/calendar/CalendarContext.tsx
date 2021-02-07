import React, { createContext, useContext, useReducer } from "react";
import { CalendarWeekData } from "../../dto/calendar";

interface CalendarContextState {
  getWeekData: (week: number) => CalendarWeekData | undefined;
  setWeekData: (week: number, data: CalendarWeekData) => void;
}

const INIT_CONTEXT_STATE: CalendarContextState = {
  getWeekData: () => undefined,
  setWeekData: () => null,
};

export const CalendarContext = createContext(INIT_CONTEXT_STATE);

interface CalendarContextProviderProps {
  children: React.ReactNode;
}

interface CalendarState {
  [key: number]: CalendarWeekData;
}

const INIT_CALENDAR_STATE: CalendarState = {};

const SET_WEEK_DATA = "SET_WEEK_DATA";
const UPDATE_WEEK_DATA = "ALTER_WEEK_DATA";

type CalendarStateActions =
  | { type: typeof SET_WEEK_DATA; week: number; data: CalendarWeekData }
  | { type: typeof UPDATE_WEEK_DATA; week: number; data: CalendarWeekData };

function calendarReducer(
  state: CalendarState,
  action: CalendarStateActions
): CalendarState {
  switch (action.type) {
    case SET_WEEK_DATA:
      return { ...state, [action.week]: action.data };
    default:
      throw new Error();
  }
}

export function CalendarContextProvider({
  children,
}: CalendarContextProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(calendarReducer, INIT_CALENDAR_STATE);

  function getWeekData(week: number): CalendarWeekData | undefined {
    return state[week];
  }

  function setWeekData(week: number, data: CalendarWeekData): void {
    dispatch({ type: SET_WEEK_DATA, week, data });
  }

  return (
    <CalendarContext.Provider value={{ getWeekData, setWeekData }}>
      {children}
    </CalendarContext.Provider>
  );
}

export default function useCalendarContext(): CalendarContextState {
  const context = useContext(CalendarContext);

  return context;
}

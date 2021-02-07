import { RestResponse } from "./common";
/**
 * Here we have decission how would BE store time slot states.
 * One option is just to store occupied time slots and based
 * on bussines requirements assume BREAK (from the assigment 
 * constant timeslots) or INVALID state (past days, odd saturdays)
 * 
 * I chose option where BE returns all timeslots for that day
 * regardles of state. This options helps in case of new features
 * for app i.e. interface + API for configuring doctor break time
 * for different days or color indication for new timeslot states 
 * i.e  AVAILIBLE_BLOOD_SAMPLE timeslot only for taking blood 
 * samples of patient
 */
export type TimeSlotState = "AVAILIBLE" | "SELECTED" | "OCCUPIED" | "BREAK" | "INVALID"; 


/**
 * I've decided to indentify different time slots by id instead of string
 *  e.i "8:30" so I can use same render logic for both even and odd days 
 * and also write algorithm for generating mocked data easier
 *  */
export interface CalendarTimeSlot {
    timeSlotId: number;
    state: TimeSlotState;
}

export interface CalendarWeekData {
    monday: Array<CalendarTimeSlot>;
    tuesday: Array<CalendarTimeSlot>;
    wednesday: Array<CalendarTimeSlot>;
    thursday: Array<CalendarTimeSlot>;
    friday: Array<CalendarTimeSlot>;
    saturday: Array<CalendarTimeSlot>;
}

export type GetCalendarWeekResponse = RestResponse<CalendarWeekData>;

export type UpdateTimeSlotRequest = {
    week: number;
    day: keyof CalendarWeekData;
    timeSlotId: number;
    slotState: TimeSlotState;
}

export type UpdateTimeSlotResponse = RestResponse<CalendarWeekData>;
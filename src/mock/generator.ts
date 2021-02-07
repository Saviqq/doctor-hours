import moment from "moment";
import { CalendarTimeSlot, CalendarWeekData } from "../dto/calendar";

const TERMS_COUNT = 12;
const BREAK_TERM_INDEX = 6;
const PRE_GENERATED_TERMS = 15;
const DAYS: Array<keyof CalendarWeekData> = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];


export default class CalendarWeekGenerator {
    private isValidWeek(week: number) {
        const isSunday = moment().isoWeekday() === 7; 
        const isOddSaturday = moment().isoWeekday() === 6 && moment().date() % 2 === 0;
        const weekInvalid = moment().week() === week && (isOddSaturday || isSunday);
        return !weekInvalid;
    }

    private randomIntFromInterval(min: number, max: number): number { 
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

    private initializeTerms(): Array<CalendarTimeSlot> {
        const terms: Array<CalendarTimeSlot> = [];
        for(let i = 0; i < TERMS_COUNT; i++) {
            terms.push({ timeSlotId: i, state: i !== BREAK_TERM_INDEX ? 'AVAILIBLE' : 'BREAK'})
        }
        return terms;
    }

    private initializeOddSaturdayOrPastDateTerms(): Array<CalendarTimeSlot> {
        const terms: Array<CalendarTimeSlot> = [];
        for(let i = 0; i < TERMS_COUNT; i++) {
            terms.push({ timeSlotId: i, state: 'INVALID'})
        }
        return terms;
    }

    generateCalendarWeek(week: number): CalendarWeekData {
        const initTerms = this.initializeTerms();
        const invalidTerms = this.initializeOddSaturdayOrPastDateTerms();

        const weekDate = moment().week(week);
        const isEvenSaturday = moment(weekDate).isoWeekday("Saturday").date() % 2 === 1;
        const today = moment();

        let weekToGenerate = {
            monday: today.isAfter(moment(weekDate).isoWeekday("Monday")) ? invalidTerms : initTerms,
            tuesday: today.isAfter(moment(weekDate).isoWeekday("Tuesday")) ? invalidTerms : initTerms,
            wednesday: today.isAfter(moment(weekDate).isoWeekday("Wednesday")) ? invalidTerms : initTerms,
            thursday: today.isAfter(moment(weekDate).isoWeekday("Thursday")) ? invalidTerms : initTerms,
            friday: today.isAfter(moment(weekDate).isoWeekday("Friday")) ? invalidTerms : initTerms,
            saturday: isEvenSaturday ? initTerms : invalidTerms
        };

        if(this.isValidWeek(week)) {
            for(let i = 0; i < PRE_GENERATED_TERMS; i++) {
                let rSlot = this.randomIntFromInterval(0, TERMS_COUNT - 1);
                rSlot = rSlot === BREAK_TERM_INDEX ? rSlot + this.randomIntFromInterval(-6, 5) : rSlot;
    
                let rDay = this.randomIntFromInterval(0, isEvenSaturday ? DAYS.length - 1 : DAYS.length - 2);
                let day = DAYS[rDay];
    
                while(weekToGenerate[day][rSlot].state !== 'AVAILIBLE') {
                    rSlot = this.randomIntFromInterval(0, TERMS_COUNT - 1);
                    rSlot = rSlot === BREAK_TERM_INDEX ? rSlot + this.randomIntFromInterval(-6, 5) : rSlot;
                    rDay = this.randomIntFromInterval(0, isEvenSaturday ? DAYS.length - 1 : DAYS.length - 2);
                    day = DAYS[rDay];
                }
    
                const tmpData = weekToGenerate[day].map(it => it.timeSlotId === rSlot ? { ...it, state: 'OCCUPIED'} : it)
                weekToGenerate = { ...weekToGenerate, [day]: tmpData}
            }
        }

        return weekToGenerate;
    }
}

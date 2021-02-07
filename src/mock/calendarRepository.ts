import { CalendarTimeSlot, CalendarWeekData, TimeSlotState  } from "../dto/calendar";
import CalendarWeekGenerator from "./generator";

interface CalendarData {
    [week: number]: CalendarWeekData;
  }

class CalendarRepository {
    data: CalendarData;
    generator: CalendarWeekGenerator;

    constructor() {
        this.data = {}
        this.generator = new CalendarWeekGenerator();
    }

    public generateWeekData(week: number): CalendarWeekData {
        const weekData = this.generator.generateCalendarWeek(week);
        this.data = { ...this.data, [week]: weekData};
        return weekData;
    }


    public updateTimeSlotState(week: number, day: keyof CalendarWeekData, timeSlotId: number, slotState: TimeSlotState): CalendarWeekData {
        const tmpWeek = this.data[week];
        const tmpData = tmpWeek[day].map(it => it.timeSlotId === timeSlotId ? { ...it, state: slotState} : it);

        const weekData = { ...tmpWeek, [day]: tmpData};
        this.data = { ...this.data, [week]: weekData}
        return weekData;
    }

    public isSelectionValid(week: number, day: keyof CalendarWeekData): boolean {
        const tmpWeek = this.data[week];
        const hasAlreadySelected = tmpWeek[day].some(it => it.state === 'SELECTED');
        const reducedValues: Array<CalendarTimeSlot> = Object.values(tmpWeek).reduce((acc, it) => {
            return [...acc, ...it];
        }, []);
        const allSelected = reducedValues.filter(it => it.state === 'SELECTED');
        console.log(hasAlreadySelected);
        return !hasAlreadySelected && allSelected.length <= 1;
    }
}

export default new CalendarRepository();
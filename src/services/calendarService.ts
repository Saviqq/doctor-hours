import { GetCalendarWeekResponse, UpdateTimeSlotRequest, UpdateTimeSlotResponse } from "../dto/calendar";
import CalendarRepository from "../mock/calendarRepository";

class CalendarService {
    /**
     * Based on assigment some sort of fetch for calendar data is expected.
     * I've decided to mock BE call from data would come from, app mock
     * contains logic for genereting calendar week data and also simulate 
     * async call
     */
    getMockCalendarWeekData(week: number): Promise<GetCalendarWeekResponse> {
        return new Promise<GetCalendarWeekResponse>(resolve => setTimeout(() => {
            resolve({
                status: 'ok',
                response: CalendarRepository.generateWeekData(week)
            })
        }, 2000))
    }

    updateTimeSlotState(request: UpdateTimeSlotRequest): Promise<UpdateTimeSlotResponse> {
        const isSelectionValid = request.slotState === 'AVAILIBLE' || CalendarRepository.isSelectionValid(request.week, request.day);
        return new Promise<UpdateTimeSlotResponse>((resolve, reject) => setTimeout(() => {
            isSelectionValid ? resolve({
                status: 'ok',
                response: CalendarRepository.updateTimeSlotState(request.week, request.day, request.timeSlotId, request.slotState)
            }) : reject("error")
        }, 1000));
    }
    
}

export default new CalendarService();
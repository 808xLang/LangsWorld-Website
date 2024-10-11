// components/Calendar.js
import React, { useState } from "react";
import { add, format } from "date-fns";
import { FC } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from "./constants/config";

interface indexProps {}
interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const Calender: FC<indexProps> = ({}) => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });
  
  console.log(date.dateTime)


  const getTimes = () => {
    if (!date.justDate) return;

    const { justDate } = date;
// this is setting the times of availability 
    const beginning = add(justDate, { hours: STORE_OPENING_TIME });
    const end = add(justDate, {hours: STORE_CLOSING_TIME})
    const interval = INTERVAL //every hour in minutes

    const times = []
    for (let i = beginning; i <= end; i = add(i, {minutes: interval})){
      times.push(i)
    }
    return times
  };

  const times = getTimes()


  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {/* when a date is picked it pulls up a time using this ternary operator */}
      {date.justDate ? (
        <div className="flex gap-4">
          {times?.map((time, i) => (
            <div key={`time-${i}`} className="rounded-sm bg-gray-100 p-2">
              <button type='button' onClick={() => setDate((prev) => ({...prev, dateTime: time}))}>
                {/* kk is the 24 hour formate mm is minutes hh is the am and pm format*/}
                {format(time, 'hh:mm')} 
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Calendar
          minDate={new Date()}
          className="REACT-CALENDER p-2"
          view="month"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default Calender;

import { useState, useEffect } from "react";
import meetingsData from "../data/calendarfromtoenddate.json";

export default function CalendarApp() {
  const [meetings, setMeetings] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("Week");

  useEffect(() => {
    setMeetings(meetingsData);
  }, []);

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const ampm = i < 12 ? "AM" : "PM";
    return `${hour}:00 ${ampm}`;
  });

  const matchesHour = (hour, timeStr) => {
    const [timeHour, ampm] = timeStr.split(" ");
    let h = parseInt(timeHour);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return h === hour;
  };

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "Day") newDate.setDate(newDate.getDate() - 1);
    if (view === "Week") newDate.setDate(newDate.getDate() - 7);
    if (view === "Month") newDate.setMonth(newDate.getMonth() - 1);
    if (view === "Year") newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === "Day") newDate.setDate(newDate.getDate() + 1);
    if (view === "Week") newDate.setDate(newDate.getDate() + 7);
    if (view === "Month") newDate.setMonth(newDate.getMonth() + 1);
    if (view === "Year") newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
  };

  const weekDays = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const monthDays = () => {
    const days = [];
    const start = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    while (start.getMonth() === currentDate.getMonth()) {
      days.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return days;
  };

  const yearMonths = Array.from(
    { length: 12 },
    (_, i) => new Date(currentDate.getFullYear(), i, 1)
  );

  const miniMonthDays = (month) => {
    const days = [];
    const date = new Date(month);
    while (date.getMonth() === month.getMonth()) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handleDayClick = (day) => {
    setCurrentDate(new Date(day));
    setView("Day");
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-top">
        <div className="calendar-nav">
          <button onClick={goToPrevious}>&lt;</button>
          <div className="calendar-today">
            {currentDate.toDateString() === new Date().toDateString()
              ? "Today"
              : currentDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
          </div>
          <button onClick={goToNext}>&gt;</button>
        </div>
        <div className="calendar-tabs">
          {["Day", "Week", "Month", "Year"].map((tab) => (
            <button
              key={tab}
              className={view === tab ? "active" : ""}
              onClick={() => setView(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {view === "Week" && (
        <>
          <div className="calendar-header">
            <div></div>
            {weekDays().map((day) => (
              <div key={day} className="day-header">
                <div>
                  {day.toLocaleDateString("en-GB", { weekday: "short" })}
                </div>
                <div>{`${day.getDate()} ${day.toLocaleString("default", {
                  month: "short",
                })}`}</div>
              </div>
            ))}
          </div>
          <div className="calendar-grid">
            {timeSlots.map((time) => (
              <div key={time} className="time-row">
                <div className="time-label">{time}</div>
                {weekDays().map((day) => {
                  const slots = meetings.filter((m) => {
                    const d = new Date(m.start);
                    return (
                      d.toDateString() === day.toDateString() &&
                      matchesHour(d.getHours(), time)
                    );
                  });
                  return (
                    <div key={day} className="time-cell">
                      {slots.map((m) => (
                        <div
                          key={m.id}
                          className="meeting-card"
                          onClick={() =>
                            window.open(
                              `/meeting/${m.id}`,
                              "popup",
                              "width=400,height=400"
                            )
                          }
                        >
                          <div>{m.user_det.job_id.jobRequest_Title}</div>
                          <div>{m.user_det.handled_by.firstName}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}

      {view === "Day" && (
        <>
          <div className="calendar-header">
            <div></div>
            <div className="day-header">
              <div>
                {currentDate.toLocaleDateString("en-GB", { weekday: "short" })}
              </div>
              <div>{`${currentDate.getDate()} ${currentDate.toLocaleString(
                "default",
                { month: "short" }
              )}`}</div>
            </div>
          </div>
          <div
            className="calendar-grid"
            style={{ gridTemplateColumns: "80px 1fr" }}
          >
            {timeSlots.map((time) => {
              const slots = meetings.filter((m) => {
                const d = new Date(m.start);
                return (
                  d.toDateString() === currentDate.toDateString() &&
                  matchesHour(d.getHours(), time)
                );
              });
              return (
                <div key={time} className="time-row">
                  <div className="time-label">{time}</div>
                  <div className="time-cell">
                    {slots.map((m) => (
                      <div
                        key={m.id}
                        className="meeting-card"
                        onClick={() =>
                          window.open(
                            `/meeting/${m.id}`,
                            "popup",
                            "width=400,height=400"
                          )
                        }
                      >
                        <div>{m.user_det.job_id.jobRequest_Title}</div>
                        <div>{m.user_det.handled_by.firstName}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {view === "Month" && (
        <div className="month-grid">
          {monthDays().map((day) => {
            const slots = meetings.filter(
              (m) => new Date(m.start).toDateString() === day.toDateString()
            );
            return (
              <div
                key={day}
                className="month-day"
                onClick={() => handleDayClick(day)}
              >
                <div className="month-date">{day.getDate()}</div>
                <div className="month-dots">
                  {slots.map((m) => (
                    <div key={m.id} className="dot"></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "Year" && (
        <div className="year-grid">
          {yearMonths.map((month) => (
            <div key={month} className="mini-month">
              <div className="mini-header">
                {month.toLocaleString("default", { month: "long" })}
              </div>
              <div className="mini-days">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="mini-day-label">
                    {day}
                  </div>
                ))}
                {miniMonthDays(month).map((day) => {
                  const slots = meetings.filter(
                    (m) =>
                      new Date(m.start).toDateString() === day.toDateString()
                  );
                  return (
                    <div
                      key={day}
                      className={`mini-day ${
                        slots.length ? "has-meeting" : ""
                      }`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day.getDate()}
                      {slots.length > 0 && <div className="mini-dot"></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

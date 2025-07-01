import  { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import meetingsData from "../data/calendarfromtoenddate.json";

export default function CalendarApp() {
  const [meetings, setMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setMeetings(meetingsData);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const meetingsForSelectedDate = selectedDate
    ? meetings.filter(
        (m) => new Date(m.start).toDateString() === selectedDate.toDateString()
      )
    : [];

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const hasMeeting = meetings.some(
        (m) => new Date(m.start).toDateString() === date.toDateString()
      );
      if (hasMeeting) {
        return (
          <div
            style={{
              marginTop: 2,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "goldenrod",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          ></div>
        );
      }
    }
    return null;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Interview Schedule Calendar</h2>
      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const meetingsOnDate = meetings.filter(
              (m) => new Date(m.start).toDateString() === date.toDateString()
            );
            if (meetingsOnDate.length > 2) {
              return "more-meetings";
            }
          }
          return null;
        }}
      />

      <div style={{ marginTop: "2rem" }}>
        {selectedDate && (
          <>
            <h3>Meetings on {selectedDate.toDateString()}</h3>
            {meetingsForSelectedDate.length > 0 ? (
              meetingsForSelectedDate.map((m) => {
                const position = m.user_det.job_id.jobRequest_Title;
                const interviewer = `${m.user_det.handled_by.firstName} ${m.user_det.handled_by.lastName}`;
                const startTime = new Date(m.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const endTime = new Date(m.end).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div key={m.id} className="meeting-box">
                    <div>
                      <strong>{position}</strong>
                    </div>
                    <div>Interviewer: {interviewer}</div>
                    <div>
                      Time Slot: {startTime} - {endTime}
                    </div>
                    <button
                      onClick={() =>
                        window.open(
                          `/meeting/${m.id}`,
                          "popup",
                          "width=300,height=300,top=100,left=100"
                        )
                      }
                    >
                      View Meeting
                    </button>
                  </div>
                );
              })
            ) : (
              <div>No meetings scheduled on this day.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

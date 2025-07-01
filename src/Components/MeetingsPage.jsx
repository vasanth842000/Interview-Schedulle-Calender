import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import meetingDetailData from "../data/calendar_meeting.json";

export default function MeetingPage() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    if (parseInt(meetingDetailData.id) === parseInt(id)) {
      setMeeting(meetingDetailData);
    }
  }, [id]);

  if (!meeting) return <div style={{ padding: "2rem" }}>No meeting found.</div>;

  const candidateName = `${meeting.user_det.candidate.candidate_firstName} ${meeting.user_det.candidate.candidate_lastName}`;
  const position = meeting.user_det.job_id.jobRequest_Title;
  const interviewDate = new Date(meeting.start).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const startTime = new Date(meeting.start).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(meeting.end).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ padding: "2rem" }}>
      <p>Interview with: {candidateName}</p>
      <p>Position: {position}</p>
      <p>Interview Date: {interviewDate}</p>
      <p>
        Interview Time: {startTime} - {endTime}
      </p>
      <p>Interview via: Vasanth Meet</p>

      <button
        style={{
          marginRight: "1rem",
          padding: "10px 15px",
          background: "goldenrod",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={() => (window.location.href = meeting.link)}
      >
        Join Meeting
      </button>

      <button
        style={{
          padding: "10px 15px",
          background: "#ccc",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={() => window.close()}
      >
        Close
      </button>
    </div>
  );
}

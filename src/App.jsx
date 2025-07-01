import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalendarApp from "./Components/Calender";
import MeetingPage from "./Components/MeetingsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CalendarApp />} />
          <Route path="/meeting/:id" element={<MeetingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

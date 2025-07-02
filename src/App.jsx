import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalendarApp from "./Components/Calender";
import MeetingPage from "./Components/MeetingsPage";
import NotFound from "./Components/NotFound";

function App() {
  return (
<BrowserRouter >
      <Routes>
        <Route path="/" element={<CalendarApp />} />
        <Route path="/meeting/:id" element={<MeetingPage />} />
          <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import GlobalNav from "./components/global/GlobalNav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Game from "./pages/Game";
import AddRoom from "./pages/AddRoom";
import SearchRoom from "./pages/SearchRoom";
import Sockettest from "./pages/Sockettest";

function App() {
  return (
    <div className="h-[100vh]">
      <GlobalNav />
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Landing />} />
            <Route path="/socket" element={<Sockettest />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/search-room" element={<SearchRoom />} />
            <Route path="/game/:roomId" element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

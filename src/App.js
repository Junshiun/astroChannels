import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Channels } from "./pages/channels";
import { Channel } from "./pages/channel";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="channels">
      <Routes>
        <Route path="/" exact element={<Channels />}></Route>
        <Route path="/:channel" element={<Channel />}></Route>
        <Route path="*" exact element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

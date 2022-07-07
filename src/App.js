import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Channels } from "./pages/channels";
import { Channel } from "./pages/channel";
import { Context } from "./context/context";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route path="/" exact element={<Channels />}></Route>
          <Route path="/channels/:channel" element={<Channel />}></Route>
          <Route path="*" exact element={<Navigate to="/" />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;

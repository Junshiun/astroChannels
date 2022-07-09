import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Channels } from "./pages/channels";
import { Channel } from "./pages/channel";
import { Context } from "./context/context";
import { Header } from "./components/header/header";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/astroChannels">
      <Context>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Header>
                <Channels />
              </Header>
            }
          ></Route>
          <Route
            path="/channels/:channel"
            element={
              <Header>
                <Channel />
              </Header>
            }
          ></Route>
          <Route path="*" exact element={<Navigate to="/" />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;

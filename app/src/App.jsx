import { Route, Routes } from "react-router";
import GettingStarted from "./pages/getting-started/GettingStarted";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GettingStarted />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { ExpressaoRegular } from "./pages/ExpressaoRegular/ExpressaoRegular.js";
import { GramaticaRegular } from "./pages/GramaticaRegular/GramaticaRegular.js";
import { AutomatoFinito } from "./pages/AutomatoFinito/AutomatoFinito.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expressaoregular" element={<ExpressaoRegular />} />
        <Route path="/gramaticaregular" element={<GramaticaRegular />} />
        <Route path="/automatofinito" element={<AutomatoFinito />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

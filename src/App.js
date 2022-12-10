import Map from './screen/map'

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Map/> */}
        <Router>
          <Routes>
          <Route path="/EtnecaMap" element={<Map />} />
            {/* <Route path="/:Type/:Geojson" element={<Map />} /> */}
            {/* <Route path="/" element={<FristPage />} /> */}
            {/* <Route path="/:Token/:Kml/" element={<Map />} /> */}
            </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;


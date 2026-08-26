import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LogsPage } from './pages/LogsPage';
import { ClientsPage } from './pages/ClientsPage';
import './App.css';
import { StartSimulation } from './components/simulation/StartSimulation';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <nav className='w-full bg-white shadow-sm'>
          <div className='max-w-7xl mx-auto py-4'>

            <Link to="/">Logs</Link>
            {' | '}
            <Link to="/clients">Connected clients</Link>
            {' | '}
            <Link to="/start">Start simulation</Link>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-4">
          <Routes>
            <Route path='/start' element={<StartSimulation />} />
            <Route path="/" element={<LogsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

/**
 * 
==========================================================================================
  TODO
==========================================================================================
 2. Nice to have -> Real-time simulation/orchestrator info (websockets)
 3. Show change ratios for each client
 4. Add start simulation function
 5. Add next epoch when simulation is state mode
 6. Improve client info view
 7. Show client logs on client info view <- filter logs by client and labels
 8. Show orchestrator logs -> All logs in one place
 9. Create new clients
 10. Create client to client connections
 11. Show simulation summary <- Information of the simmulation without warnings and errors
 12. Show simulation summary by client
==========================================================================================
==========================================================================================
  Done
==========================================================================================
 1. Add weights on the connections
 
==========================================================================================
 * 
 */
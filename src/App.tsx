
import './App.css'
import { OpenStreamsClientsInfo } from './components/OpenStreamsInfo'

function App() {

  return (
    <div>
      <h1>Open Streams</h1>
      <OpenStreamsClientsInfo />
    </div>
  )
}

export default App

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
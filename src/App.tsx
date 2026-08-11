
import './App.css'
import { ClientList } from './components/ClientList'
import { OpenStreamsList } from './components/OpenStreamsList'
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

import './App.css'
import '~picocss/pico.min.css'
import Options from './components/Options'

const App = () => {

  return (
    <div className="App">
      <Options />
      
      <div>
        <button>Customize</button>
      </div>
    </div>
  )
}

export default App
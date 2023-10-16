// import logo from './logo.svg';
import './App.css';
import Matrix from './components/Matrix'

function App() {
  return (
    <div className="App">
      <Matrix 
        charRandom={.5} 
        updateRandom={.99} 
        text="God make me a saint but not yet"
      />
    </div>
  );
}

export default App;

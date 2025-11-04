import SumCalculator from './components/SumCalculator';
import './App.css';

function App() {
  return (
    <div className="starfield">
      <div className="stars-layer1"></div>
      <div className="stars-layer2"></div>
      <div className="stars-layer3"></div>
      
      <div className="App">
        <SumCalculator />
      </div>
    </div>
  );
}

export default App;
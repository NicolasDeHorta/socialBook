import logo from './logo.svg';
import './App.css';
import { Links } from './components/Links';
import {Footer} from './components/Footer';

function App() {




  return (
    <div className="container p-4">     
      <div className="row">
            <Links />
      </div>
      <Footer />
    </div>
  );
}

export default App;

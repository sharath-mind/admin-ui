import { AlertProvider } from './AlertContext';
import Alert from './components/Alert';
import LandingPage from './view/LandingPage';

function App() {
  return (
    <AlertProvider>
      <LandingPage />
      <Alert />
    </AlertProvider>
  );
}

export default App;

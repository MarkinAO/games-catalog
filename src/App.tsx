import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Pages from './pages/Pages';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Pages />
      </Provider>      
    </BrowserRouter>
  )
}

export default App

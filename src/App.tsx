import React from 'react';
import Todos from './pages/Todos';
import Login from './pages/Login';
import NavigationBar from './components/NavigationBar';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

const App:React.FC = () => {

  return (
    <BrowserRouter>
      
      <NavigationBar />

      <Switch>
        <Route path="/" exact component={ Todos } />
        <Route path="/login" exact component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

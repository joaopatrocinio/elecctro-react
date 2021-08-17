import React from 'react';
import Todos from './pages/Todos';
import Login from './pages/Login';
import NavigationBar from './components/NavigationBar';
import AuthProvider from './AuthProvider';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

const App:React.FC = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        
        <NavigationBar />

        <Switch>
          <Route path="/" exact component={ Todos } />
          <Route path="/login" exact component={ Login } />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

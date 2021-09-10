import React from 'react';
import Todos from './pages/Todos';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavigationBar from './components/NavigationBar';
import AuthProvider from './services/AuthProvider';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

const App:React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={ Todos } />
            <Route path="/login" exact component={ Login } />
            <Route path="/signup" exact component={ Signup } />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

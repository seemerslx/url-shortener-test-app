import AuthContextProvider from './components/Auth/AuthContextProvider';
import { configureInterceptor } from './components/Helpers/httpInterceptors';
import MyRouter from './router/router-config';

configureInterceptor();

function App() {
  return (
    <AuthContextProvider>
      <MyRouter />
    </AuthContextProvider>
  );
}

export default App;

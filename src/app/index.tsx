import React from 'react';
import { Router } from 'react-router-dom';
import AllRoutes from './routing/route';
import history from "./routing/history";

export const App = () => {
  return <Router history={history}>
    <AllRoutes />
  </Router>
}

export default App



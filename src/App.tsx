import { useState } from 'react';

import './default.css';
import Loading from './components/loading';
import Main from './pages/main';
import GlobalFont from './constants/globalFont';

const App = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <GlobalFont />
      <Loading isLoading={isLoading} />
      <Main setLoading={setLoading} />
    </>
  );
};

export default App;

import type { NextPage } from 'next';
import HomePage from './HomePage/home';
import { store } from '../store/store';
import { Provider } from 'react-redux';
const Home: NextPage = () => {
  return (
    <div>
      <Provider store={store}>
        <HomePage />
      </Provider>
      ,
    </div>
  );
};

export default Home;

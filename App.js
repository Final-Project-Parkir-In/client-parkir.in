import { Provider, useDispatch, useSelector } from 'react-redux';

import { store } from './app/store';
import Index from './Index';
export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

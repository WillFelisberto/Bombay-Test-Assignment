

import rootSaga from '@/store/rootSagas';
import createSagaMiddleware from 'redux-saga';
import rootReducer from "@/store/rootReduces";
import { configureStore } from "@reduxjs/toolkit";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

sagaMiddleware.run(rootSaga);

export default store;
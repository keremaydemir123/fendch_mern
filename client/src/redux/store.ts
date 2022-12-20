import { configureStore } from '@reduxjs/toolkit';

import commentReducer from './comments/commentSlice';

const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
});

export default store;

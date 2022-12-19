import { createSlice } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [
      {
        id: 1,
        likes: 0,
      },
    ],
  },
  reducers: {
    createComment: (state, action) => {
      state.comments.push(action.payload);
    },
    likeComment: (state, action) => {
      const { id } = action.payload;
      const comment = state.comments.find((comment) => comment.id === id);
      if (comment) {
        comment.likes += 1;
      }
    },
  },
  extraReducers: {},
});

export const { createComment, likeComment } = commentSlice.actions;
export const selectCount = (state) => state.counter.value;
export default commentSlice.reducer;

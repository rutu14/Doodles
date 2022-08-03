import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './redux/auth';
import { NoteSlice } from './redux/notes';
import { TagSlice } from './redux/tag';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    notes: NoteSlice.reducer,
    tags: TagSlice.reducer,
  },
})
import { configureStore } from '@reduxjs/toolkit'
import { ArchiveSlice } from './redux/archive'
import { userSlice } from './redux/auth'
import { NoteSlice } from './redux/notes'
import { TagSlice } from './redux/tag'
import { TrashSlice } from './redux/trash'

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    notes: NoteSlice.reducer,
    tags: TagSlice.reducer,
    trash: TrashSlice.reducer,
    archive: ArchiveSlice.reducer
  },
})
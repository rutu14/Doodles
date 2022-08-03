import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, errorMessage } from "../utils";

export const getAllNotes = createAsyncThunk(
    "users/getAllNotes",
    async (toast,thunkAPI) => {
		try {
			const { data } = await axios.get( '/api/notes', config);
			return data.notes;
		} catch (e) {
			const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);
		}
    }
)

export const createaNote = createAsyncThunk(
    "users/createaNote",
    async ({note,toast},thunkAPI) => {
		try {
			const { data } = await axios.post( '/api/notes', {note}, config);
			toast({
				title: 'Added a Note',
				variant:'noteCreated',
				isClosable: true,
                icon: '✨',
			});
			return data.notes;
		} catch (e) {
			const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);
		}
    }
)

export const editaNote = createAsyncThunk(
    "users/editaNote",
    async ({noteId, note, toast}, thunkAPI) => {
		try {
			const { data } = await axios.post( `/api/notes/${noteId}`, {note}, config);
			toast({
				title: 'Updated the Note',
				variant:'noteEdited',
				isClosable: true,
                icon: '🖊'
			});
			return data.notes;
		} catch (e) {
			const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);
		}
    }
)

export const getArchive = createAsyncThunk(
    "users/getArchive",
    async (toast,thunkAPI) => {
      try {
        const { data } = await axios.get( '/api/archives', config);
        return data.archives;
      } catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);
      }
    }
  )

  export const addToArchive = createAsyncThunk(
    "users/addToArchive",
    async ({noteId,toast},thunkAPI) => {
        try {
            const { data } = await axios.post( `/api/notes/archives/${noteId}`, {}, config);
            toast({
                title: 'Added to archive',
                status: 'success',
                variant:'noteCreated',
                isClosable: true,
                icon: '✨'
            });
            return data;
        } catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
                toast({
                    title: errorTitle,
                    status: 'error',
                    variant:'left-accent',
                    isClosable: true,
                });
                return thunkAPI.rejectWithValue(errorTitle);
        }
    }
  )

  export const restoreArchive = createAsyncThunk(
    "users/restoreArchive",
    async ({noteId, toast}, thunkAPI) => {
        try {
            const { data } = await axios.post( `/api/archives/restore/${noteId}`,{}, config);
            toast({
                title: 'Restored the archive',
                status: 'success',
                variant:'noteEdited',
                isClosable: true,
                icon: '🗄'
            });
            return data;
        } catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
                toast({
                    title: errorTitle,
                    status: 'error',
                    variant:'left-accent',
                    isClosable: true,
                });
                return thunkAPI.rejectWithValue(errorTitle);
        }
    }
)
  
export const deleteArchive = createAsyncThunk(
    "users/deleteArchive",
    async ({noteId, toast},thunkAPI) => {
        try {
            const { data } = await axios.delete( `/api/archives/delete/${noteId}`, config);
            toast({
				title: 'Deleted the archive',
				status: 'success',
				variant:'noteDeleted',
				isClosable: true,
                icon: '🗑'
			});
            return data.archives;
        } catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);
        }
    }
)

export const getTrash = createAsyncThunk(
    "users/getTrash",
    async (toast,thunkAPI) => {
        try {
            const { data } = await axios.get('/api/trash', config);
            return data.trash;
        } catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);
        }
    }
)

export const addtoTrash = createAsyncThunk(
    "users/addtoTrash",
    async ({noteId,toast},thunkAPI) => {
        try {
            const { data } = await axios.post(`/api/notes/trash/${noteId}`,{}, config);
            toast({
                title: 'Moved to trash',
                status: 'success',
                variant:'noteCreated',
                isClosable: true,
                icon: '🧹'
            });
            return data;
        } catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);
        }
    }
)

export const restorefromTrash = createAsyncThunk(
    "users/restorefromTrash",
    async ({noteId,toast},thunkAPI) => {
        try {
            const { data } = await axios.post(`/api/trash/restore/${noteId}`,{}, config);
            toast({
                title: 'Restored the Note',
                status: 'success',
                variant:'noteEdited',
                isClosable: true,
                icon: '🗄'
            });
            return data;
        } catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);
        }
    }
)

export const deleteNoteFromTrash = createAsyncThunk(
    "users/deleteNoteFromTrash",
    async ({noteId,toast},thunkAPI) => {
		try {
			const { data } = await axios.delete( `/api/trash/delete/${noteId}`, config);
			toast({
				title: 'Deleted the Note',
				variant:'noteDeleted',
				isClosable: true,
                icon: '🗑'
			}) 
			return data.trash;
		} catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);
		}
    }
)

const initialState= {
    notes:[],
    archives:[],
    trash:[],
    isGetNotesFetching: false,
    isCreateFetching: false,
    isEditFetching: false,  
    isGetArchiveFetching:false, 
    isAddToArchiveFetching:false,
    isRestoreArchiveFetching:false,
    isDeleteArchiveFetching:false,
    isTrashFetching: false, 
    isAddToTrashFetching: false, 
    isRestoreTrashFetching: false,
    isDeleteTrashFetching: false, 
};

export const NoteSlice = createSlice({
  	name: "notes",
  	initialState,
  	reducers: {},
  	extraReducers: {
        // Note CRUD Operations
		[getAllNotes.fulfilled]: (state, { payload }) => {
			state.isGetNotesFetching = false;
			state.notes = payload;
		},
		[getAllNotes.pending]: (state) => {
			state.isGetNotesFetching = true;
		},
		[getAllNotes.rejected]: (state) => {
			state.isGetNotesFetching = false;
		},
		[createaNote.fulfilled]: (state, { payload }) => {
			state.isCreateFetching = false;
			state.notes = payload;
		},
		[createaNote.pending]: (state) => {
			state.isCreateFetching = true;
		},
		[createaNote.rejected]: (state) => {
			state.isCreateFetching = false;
		},
		[editaNote.fulfilled]: (state, { payload }) => {
			state.isEditFetching = false;
			state.notes = payload;
		},
		[editaNote.pending]: (state) => {
			state.isEditFetching = true;
		},
		[editaNote.rejected]: (state) => {
			state.isEditFetching = false;
		},

        // Archive Operations
        [getArchive.fulfilled]: (state, { payload }) => {
            state.isGetArchiveFetching = false;
            state.archives = payload;
        },
        [getArchive.pending]: (state) => {
            state.isGetArchiveFetching = true;
        },
        [getArchive.rejected]: (state) => {
            state.isGetArchiveFetching = false;
        },
        [addToArchive.fulfilled]: (state, { payload }) => {
              state.isAddToArchiveFetching = false;       
              state.archives = payload.archives;
              state.notes = payload.notes;
        },
        [addToArchive.rejected]: (state) => {
              state.isAddToArchiveFetching = false;
        },
        [addToArchive.pending]: (state) => {
              state.isAddToArchiveFetching = true;
        },
        [restoreArchive.fulfilled]: (state, { payload }) => {
              state.isRestoreArchiveFetching = false;
              state.archives = payload.archives;
              state.notes = payload.notes;
        },
        [restoreArchive.pending]: (state) => {
              state.isRestoreArchiveFetching = true;
        },
        [restoreArchive.rejected]: (state) => {
              state.isRestoreArchiveFetching = false;
        },
        [deleteArchive.fulfilled]: (state, { payload }) => {
              state.isDeleteArchiveFetching = false;
              state.archives = payload;
        },
        [deleteArchive.pending]: (state) => {
              state.isDeleteArchiveFetching = true;
        },
        [deleteArchive.rejected]: (state) => {
              state.isDeleteArchiveFetching = false;
        },

        // Trash Operation
        [getTrash.fulfilled]: (state, { payload }) => {
			state.isTrashFetching = false;
			state.trash = payload;
		},
		[getTrash.pending]: (state) => {
			state.isTrashFetching = true;
		},
		[getTrash.rejected]: (state) => {
			state.isTrashFetching = false;
		},
		[addtoTrash.fulfilled]: (state, { payload }) => {
			state.isAddToTrashFetching = false;
			state.trash = payload.trash;
            state.notes = payload.notes;
		},
		[addtoTrash.pending]: (state) => {
			state.isAddToTrashFetching = true;
		},
		[addtoTrash.rejected]: (state) => {
			state.isAddToTrashFetching = false;
		},
        [restorefromTrash.fulfilled]: (state, { payload }) => {
			state.isRestoreTrashFetching = false;
			state.trash = payload.trash;
            state.notes = payload.notes;
		},
		[restorefromTrash.pending]: (state) => {
			state.isRestoreTrashFetching = true;
		},
		[restorefromTrash.rejected]: (state) => {
			state.isRestoreTrashFetching = false;
		},
		[deleteNoteFromTrash.fulfilled]: (state, { payload }) => {
			state.isDeleteTrashFetching = false;
			state.trash = payload;
		},
		[deleteNoteFromTrash.pending]: (state) => {
			state.isDeleteTrashFetching = true;
		},
		[deleteNoteFromTrash.rejected]: (state) => {
			state.isDeleteTrashFetching = false;
		},
  	},
})
export const noteSelector = state => state.notes;
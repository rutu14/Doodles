import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { 'authorization': token } };

export const getArchive = createAsyncThunk(
    "users/getArchive",
    async (toast,thunkAPI) => {
      try {
        const { data } = await axios.get( '/api/archives', config);
        return data.archives;
      } catch (e) {
        toast({
            title: e.response.data.errors[0],
            status: 'error',
            variant:'left-accent',
            isClosable: true,
        })
        return thunkAPI.rejectWithValue(e.response.data.errors[0]);
      }
    }
  )

  export const addToArchive = createAsyncThunk(
    "users/addToArchive",
    async ({noteId,note,toast},thunkAPI) => {
      try {
        const { data } = await axios.post( `/api/notes/archives/${noteId}`, {note}, config);
        toast({
                        title: 'Added to archive✨',
                        status: 'success',
                        variant:'left-accent',
                        isClosable: true,
                    });
        return data;
      } catch (e) {
        toast({
                        title: e.response.data.errors[0],
                        status: 'error',
                        variant:'left-accent',
                        isClosable: true,
                    }) 
        ("Error", e.response.data.errors[0]);
        return thunkAPI.rejectWithValue(e.response.data.errors[0]);
      }
    }
  )

  export const restoreArchive = createAsyncThunk(
    "users/restoreArchive",
    async ({noteId, toast}, thunkAPI) => {
      try {
        const { data } = await axios.post( `/api/archives/restore/${noteId}`, config);
        toast({
            title: 'Updated the archive🖐🏻',
            status: 'success',
            variant:'left-accent',
            isClosable: true,
        });
        return data;
      } catch (e) {
        toast({
            title: e.response.data.errors[0],
            status: 'error',
            variant:'left-accent',
            isClosable: true,
        })
        return thunkAPI.rejectWithValue(e.response.data.errors[0]);
      }
    }
  )
  
  export const deleteArchive = createAsyncThunk(
    "users/deleteArchive",
    async ({noteId, toast},thunkAPI) => {
      try {
        const { data } = await axios.delete( `/api/archives/delete/${noteId}`, config);
        return data.archives;
      } catch (e) {
        toast({
            title: e.response.data.errors[0],
            status: 'error',
            variant:'left-accent',
            isClosable: true,
        })
        thunkAPI.rejectWithValue(e.response.data.errors[0]);
      }
    }
  )
const initialState= {
    archives:[],
    notes:[],
    isArchiveFetching: false,
    isAddToArchiveFetching: false,
    isRestoreFromArchiveFetching: false, 
    isDeleteArchiveFetching: false
};
export const ArchiveSlice = createSlice({
  name: "archives",
  initialState,
  reducers: {},
  extraReducers: {
    [getArchive.fulfilled]: (state, { payload }) => {
      state.isArchiveFetching = false;
      state.archives = payload;
    },
    [getArchive.pending]: (state) => {
      state.isArchiveFetching = true;
    },
    [getArchive.rejected]: (state, { payload }) => {
      state.isArchiveFetching = false;
      
    },
    [addToArchive.fulfilled]: (state, { payload }) => {
        state.isOneHabitFetching = false;       
        state.archives = payload.archives;
        state.notes = payload.notes;
    },
    [addToArchive.rejected]: (state, { payload }) => {
        state.isOneHabitFetching = false;
    },
    [addToArchive.pending]: (state) => {
        state.isOneHabitFetching = true;
    },
	[restoreArchive.fulfilled]: (state, { payload }) => {
		state.isRestoreFromArchiveFetching = false;
        state.archives = payload.archives;
        state.notes = payload.notes;
	},
	[restoreArchive.pending]: (state) => {
		state.isRestoreFromArchiveFetching = true;
	},
	[restoreArchive.rejected]: (state, { payload }) => {
		state.isRestoreFromArchiveFetching = false;
	},
	[deleteArchive.fulfilled]: (state, { payload }) => {
		state.isDeleteArchiveFetching = false;
		state.archives = payload;
	},
	[deleteArchive.pending]: (state) => {
		state.isDeleteArchiveFetching = true;
	},
	[deleteArchive.rejected]: (state, { payload }) => {
		state.isDeleteArchiveFetching = false;
	},
  },
})
export const archiveSelector = state => state.archives;
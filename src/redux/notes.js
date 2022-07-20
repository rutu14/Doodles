import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { 'authorization': token } };

export const getAllNotes = createAsyncThunk(
    "users/getAllNotes",
    async (thunkAPI) => {
		try {
			const { data } = await axios.get( '/api/notes', config);
			return data.notes;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data.errors[0]);
		}
    }
)

export const createaNote = createAsyncThunk(
    "users/createaNote",
    async ({note,toast},thunkAPI) => {
		try {
			const { data } = await axios.post( '/api/notes', {note}, config);
			toast({
				title: 'Added a Note✨',
				status: 'success',
				variant:'left-accent',
				isClosable: true,
			});
			return data.notes;
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

export const editaNote = createAsyncThunk(
    "users/editaNote",
    async ({noteId, note, toast}, thunkAPI) => {
		try {
			const { data } = await axios.post( `/api/notes/${noteId}`, {note}, config);
			toast({
				title: 'Updated the Note🖐🏻',
				status: 'success',
				variant:'left-accent',
				isClosable: true,
			});
			return data.notes;
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

export const deleteaNote = createAsyncThunk(
    "users/deleteaNote",
    async ({noteId,toast},thunkAPI) => {
    	try {
			const { data } = await axios.delete( `/api/notes/${noteId}`, config);
			toast({
				title: 'Deleted the Note 🔥',
				status: 'success',
				variant:'left-accent',
				isClosable: true,
			});
			return data.notes;
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
    notes:[],
    isFetching: false,
    isCreateFetching: false,
    isEditFetching: false, 
    isOneHabitFetching: false,
    isDeleteFetching: false, 
};

export const NoteSlice = createSlice({
  	name: "notes",
  	initialState,
  	reducers: {},
  	extraReducers: {
		[getAllNotes.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
			state.notes = payload;
		},
		[getAllNotes.pending]: (state) => {
			state.isFetching = true;
		},
		[getAllNotes.rejected]: (state) => {
			state.isFetching = false;
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
		[deleteaNote.fulfilled]: (state, { payload }) => {
			state.isDeleteFetching = false;
			state.notes = payload;
		},
		[deleteaNote.pending]: (state) => {
			state.isDeleteFetching = true;
		},
		[deleteaNote.rejected]: (state) => {
			state.isDeleteFetching = false;
		},
  	},
})
export const noteSelector = state => state.notes;
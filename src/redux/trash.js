import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { 'authorization': token } };

export const getTrash = createAsyncThunk(
    "users/getTrash",
    async (thunkAPI) => {
        try {
            const { data } = await axios.get('/api/trash', config);
            return data.trash;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.errors[0]);
        }
    }
)

export const addtoTrash = createAsyncThunk(
    "users/addtoTrash",
    async ({noteId,toast},thunkAPI) => {
        try {
            const { data } = await axios.post(`/api/notes/trash/${noteId}`, config);
            toast({
                title: 'Moved to trash',
                status: 'info',
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

export const restorefromTrash = createAsyncThunk(
    "users/restorefromTrash",
    async ({noteId,toast},thunkAPI) => {
        try {
            const { data } = await axios.post(`/api/trash/restore/${noteId}`, config);
            toast({
                title: 'Restored the Note',
                status: 'info',
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

export const deleteTrash = createAsyncThunk(
    "users/deleteTrash",
    async ({tagId,toast},thunkAPI) => {
		try {
			const { data } = await axios.delete( `/api/trash/delete/${tagId}`, config);
			toast({
				title: 'Trash Deleted',
				status: 'success',
				variant:'left-accent',
				isClosable: true,
			}) 
			return data.trash;
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
    trash:[],
    notes:[],
    isTrashFetching: false, 
    isAddToTrashFetching: false, 
    isRestoreTrashFetching: false,
    isDeleteTrashFetching: false, 
};

export const TrashSlice = createSlice({
	name: "trash",
	initialState,
	reducers: {},
	extraReducers: {
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
		[deleteTrash.fulfilled]: (state, { payload }) => {
			state.isDeleteTrashFetching = false;
			state.trash = payload;
		},
		[deleteTrash.pending]: (state) => {
			state.isDeleteTrashFetching = true;
		},
		[deleteTrash.rejected]: (state) => {
			state.isDeleteTrashFetching = false;
		},
	},
})
export const trashSelector = state => state.trash;
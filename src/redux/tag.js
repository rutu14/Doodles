import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { 'authorization': token } };

export const getTags = createAsyncThunk(
    "users/getTags",
    async (thunkAPI) => {
        try {
            const { data } = await axios.get('/api/tags', config);
            return data.tags;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.errors[0]);
        }
    }
)

  export const createaTag = createAsyncThunk(
    "users/createaTag",
    async ({tag,toast},thunkAPI) => {
        try {
            const { data } = await axios.post('/api/tags/addtag', {tag}, config);
            toast({
                title: 'Added an tag',
                status: 'success',
                variant:'left-accent',
                isClosable: true,
            });
            return data.tags;
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

export const deleteaTag = createAsyncThunk(
    "users/deleteaTag",
    async ({tagId,toast},thunkAPI) => {
		try {
			const { data } = await axios.delete( `/api/tags/${tagId}`, config);
			toast({
				title: 'Tag Deleted',
				status: 'success',
				variant:'left-accent',
				isClosable: true,
			}) 
			return data.tags;
		} catch (e) {
			thunkAPI.rejectWithValue(e.response.data.errors[0]);
		}
    }
)

const initialState= {
    tags:[],
    isTagFetching: false,  
    isCreateTagFetching: false,
    isDeleteTagFetching: false, 
};

export const TagSlice = createSlice({
	name: "tags",
	initialState,
	reducers: {},
	extraReducers: {
		[getTags.fulfilled]: (state, { payload }) => {
			state.isTagFetching = false;
			state.tags = payload;
		},
		[getTags.pending]: (state) => {
			state.isTagFetching = true;
		},
		[getTags.rejected]: (state) => {
			state.isTagFetching = false;
		},
		[createaTag.fulfilled]: (state, { payload }) => {
			state.isCreateTagFetching = false;
			state.tags = payload;
		},
		[createaTag.pending]: (state) => {
			state.isCreateTagFetching = true;
		},
		[createaTag.rejected]: (state) => {
			state.isCreateTagFetching = false;
		},
		[deleteaTag.fulfilled]: (state, { payload }) => {
			state.isDeleteTagFetching = false;
			state.tags = payload;
		},
		[deleteaTag.pending]: (state) => {
			state.isDeleteTagFetching = true;
		},
		[deleteaTag.rejected]: (state) => {
			state.isDeleteTagFetching = false;
		},
	},
})
export const tagSelector = state => state.tags;
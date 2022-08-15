import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorMessage } from "../utils";

export const getTags = createAsyncThunk(
    "users/getTags",
    async (toast,thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
            const { data } = await axios.get('/api/tags', config);
            return data.tags;
        } catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);;
        }
    }
)

export const createaTag = createAsyncThunk(
    "users/createaTag",
    async ({tag,toast},thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
            const { data } = await axios.post('/api/tags/addtag', {tag}, config);
            toast({
                title: 'Added a tag',
                status: 'success',
                variant:'noteCreated',
                isClosable: true,
                icon: '🖍'
            });
            return data.tags;
        } catch (e) {
            const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
            toast({
                title: errorTitle,
                status: 'error',
                variant:'left-accent',
                isClosable: true,
            });
            return thunkAPI.rejectWithValue(errorTitle);;
        }
    }
)

export const deleteaTag = createAsyncThunk(
    "users/deleteaTag",
    async ({tagId,toast},thunkAPI) => {
		try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
			const { data } = await axios.delete( `/api/tags/${tagId}`, config);
			toast({
				title: 'Tag Deleted',
				status: 'success',
				variant:'noteDeleted',
				isClosable: true,
                icon: '🗑'
			}) 
			return data.tags;
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
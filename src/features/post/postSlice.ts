import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postService from '../../services/post.service';
import { RootState } from '../../store';

export interface Post {
    id: number,
    title: string,
    body: string,
    userId: number
}
interface PostState {
    post: Post | null,
    posts: Post[],
    isLoading: boolean,
    status: string,
    error: string |null | undefined
}
const initialState: PostState = {
    post: null,
    posts: [],
    isLoading: false,
    status: 'idle',
    error: null,
};
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await postService.list();
    return response;
});
export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Add any fetched posts to the array
          state.posts = state.posts.concat(action.payload);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
});

export const selectAllPost = (state: RootState) => state.post.posts;

export default postSlice.reducer;

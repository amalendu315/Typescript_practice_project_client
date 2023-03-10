import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    mode: 'light',
    user: null,
    token: null,
    posts: [],
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setMode: (state, action) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state, action) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state:any, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            } else {
                console.log('No user found');
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state:any, action) => {
            const updatedPosts = state.posts.map((post:any) => {
              if (post._id === action.payload.post._id) {
                return action.payload.post;
              }
              return post;
            });
            state.posts = updatedPosts;
        },
    },
});

export const { setLoading, setMode, setLogin, setLogout, setFriends, setPosts, setPost } = appSlice.actions;
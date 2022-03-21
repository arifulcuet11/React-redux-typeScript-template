import { Post } from '../features/post/postSlice';
import { api } from './api.service';

const postService = {
    list: () => api<Post[]>('posts').then((res) => res).catch((err) => err),
};

export default postService;

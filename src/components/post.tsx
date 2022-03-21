import { useEffect } from 'react';
import { fetchPosts, selectAllPost } from '../features/post/postSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const PostsList = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectAllPost);

    const postStatus = useAppSelector((state) => state.post.status);
    // const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    return (
      <section className="posts-list p-4">
        {postStatus}
        <table className="table-fixed bg-yellow-200">
          <tr className="bg-gray-50 dark:bg-gray-700">
            <td>ID</td>
            <td>Title</td>
            <td>Body</td>
            <td>User ID</td>
          </tr>
          {posts.map((post) => (
            <tr key={post.id} className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
              <td className="p-4">
                {post.id}
              </td>
              <td className="p-4">
                {post.title}
              </td>
              <td className="py-4 p-4">
                {post.body}
              </td>
              <td className="p-4">
                {post.userId}
              </td>
            </tr>
                ))}
        </table>

      </section>
    );
};

export default PostsList;

/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useSelector((state) => state.auth.userData?.$id);

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const fetchedPosts = await appwriteService.getMyPosts(userId);
                if (fetchedPosts) {
                    setPosts(fetchedPosts.documents);
                }
            } catch (err) {
                setError('Failed to load your posts.');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchMyPosts();
        }
    }, [userId]);

    if (loading) {
        return <div className='py-8 text-center'>Loading...</div>;
    }

    if (error) {
        return <div className='py-8 text-center text-red-500'>{error}</div>;
    }

    return (
        <div className='w-full py-8'>
            <Container>
                {posts.length === 0 ? (
                    <div className='text-center'>
                        <h2 className='text-2xl font-bold'>No Posts Added by You</h2>
                        <p className='text-gray-500'>It seems you haven&apos;t added any posts yet.</p>
                    </div>
                ) : (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default MyPosts;

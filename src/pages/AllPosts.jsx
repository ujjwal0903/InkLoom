import { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await appwriteService.getPosts();
                if (fetchedPosts) {
                    setPosts(fetchedPosts.documents);
                }
            } catch (err) {
                setError('Failed to load posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div className='py-8 text-center text-gray-600'>Loading...</div>; 
    }

    if (error) {
        return <div className='py-8 text-center text-red-600'>{error}</div>; 
    }

    return (
        <div className='w-full py-8 bg-gray-50'>
            <Container>
                {posts.length === 0 ? (
                    <div className='text-center'>
                        <h2 className='text-2xl font-bold text-gray-800'>No Posts Available</h2>
                        <p className='text-gray-500'>It seems there are no posts to display.</p>
                    </div>
                ) : (
                    <div className='flex flex-wrap justify-center'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-4 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;

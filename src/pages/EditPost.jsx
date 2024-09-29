import { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (slug) {
                    const fetchedPost = await appwriteService.getPost(slug);
                    if (fetchedPost) {
                        setPost(fetchedPost);
                    } else {
                        navigate('/');
                    }
                } else {
                    navigate('/');
                }
            } catch (err) {
                setError('Failed to load post.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    if (loading) {
        return <div className="py-8 text-center text-gray-600">Loading...</div>; 
    }

    if (error) {
        return <div className="py-8 text-center text-red-600">{error}</div>; 
    }

    return post ? (
        <div className='py-8 bg-gray-50'> 
            <Container>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>Edit Post</h2> 
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;

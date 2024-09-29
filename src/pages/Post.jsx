import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await appwriteService.getPost(slug);
                if (fetchedPost) {
                    setPost(fetchedPost);
                } else {
                    setError("Post not found");
                    navigate("/");
                }
            } catch (err) {
                setError("Failed to fetch post");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        } else {
            setError("Invalid slug");
            navigate("/");
        }

        return () => {
            setPost(null);
        };
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                await appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex flex-row items-start gap-6">
                    <div className="flex-none w-1/3">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                        {isAuthor && (
                            <div className="flex flex-col mt-4 gap-2">
                            <Link to={`/edit-post/${post.$id}`} className="w-full">
                                <Button 
                                    className="w-1/2 py-2 bg-gradient-to-r from-green-700 to-green-500 text-white rounded-md shadow hover:from-green-600 hover:to-green-400 transition duration-200"
                                >
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                onClick={deletePost} 
                                className="w-1/2 py-2 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-md shadow hover:from-red-600 hover:to-red-400 transition duration-200"
                            >
                                Delete
                            </Button>
                        </div>                        
                        )}
                    </div>
                    <div className="flex-1 rounded-lg mx-10" > 
                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                        <div className="prose lg:prose-xl p-4 shadow-md" style={{ backgroundColor: "rgba(229, 231, 235, 0.75)" }}>
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}

import { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents.slice(0, 3));
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <h2 className="text-3xl font-semibold  mb-6">Featured Posts</h2>
                <div className="flex flex-wrap justify-center"> 
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"> 
                            <PostCard
                                {...post}
                                className="hover:shadow-lg transition-shadow duration-200"
                            />
                        </div>
                    ))}
                </div>
                <div className="text-right mt-8">
                    <p className="text-lg font-bold hover:text-gray-500">
                        <Link to="/all-posts">
                            View All Posts ...
                        </Link>
                    </p>
                </div>
            </Container>
        </div>
    );
}

export default Home;

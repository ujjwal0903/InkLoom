import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block">
            <div className='w-full bg-white rounded-lg shadow-md p-4 transition-transform duration-200 hover:scale-105 hover:shadow-lg'>
                <div className='w-full flex justify-center mb-4'>
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title ? title : "Post image"}
                        className='rounded-lg object-cover h-60 w-full'
                        onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }} 
                    />
                </div>
                <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;

/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const submit = async (data) => {
        setLoading(true);
        setErrorMessage("");

        try {
            let file;
            if (post) {
                if (data.image && data.image.length > 0) {
                    file = await appwriteService.uploadFile(data.image[0]);
                    appwriteService.deleteFile(post.featuredImage);
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                if (!data.image || data.image.length === 0) {
                    throw new Error("Image is required for new posts.");
                }
                file = await appwriteService.uploadFile(data.image[0]);
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData?.$id, // Ensure userData is defined
                    featuredImage: file?.$id,
                });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Error during submission:", error);
            setErrorMessage("An error occurred during submission. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row bg-white shadow-lg p-6 rounded-lg"> {/* Added styles */}
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
                
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post ? "Image is required" : false })}
                />
                {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg border border-gray-300"
                        />
                    </div>
                )}
                <Select
                    options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                    ]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: "Status is required" })}
                />
                {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500 hover:bg-green-600" : undefined}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
                    disabled={loading} 
                >
                    {loading ? "Submitting..." : post ? "Update" : "Submit"}
                </Button>
            </div>
            {errorMessage && <p className="text-red-500 text-center w-full">{errorMessage}</p>} 
        </form>
    );
}

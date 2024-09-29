import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from "../conf/conf";

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
    const apiKey = conf.tinymceAPIKey;

    return (
        <div className='w-full'>
            {label && (
                <label className='block mb-2 pl-1 text-gray-700 font-semibold'>
                    {label}
                </label>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        apiKey={apiKey}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                        }}
                        onEditorChange={onChange}
                        className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
            />
        </div>
    );
}

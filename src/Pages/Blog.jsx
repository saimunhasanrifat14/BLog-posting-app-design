import React, { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [blog, setBlogs] = useState([]);
  const [realtime, setrealtime] = useState(false);
  useEffect(() => {
    const getAllBlog = async () => {
      try {
        const allblog = await axios.get("http://localhost:4000/getallblog");
        setBlogs(allblog?.data?.data);
      } catch (error) {
        console.log("error from get all blog", error);
      }
    };
    getAllBlog();
  }, [realtime]);

  const [formData, setFormData] = useState({
    blogTitle: "",
    blogDescrioption: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromdata = new FormData();
    fromdata.append("blogTitle", formData.blogTitle);
    fromdata.append("blogDescrioption", formData.blogDescrioption);
    fromdata.append("image", formData.image);

    const response = await axios.post(
      "http://localhost:4000/create-blog",
      fromdata
    );
    if (response.status == 201) {
      setrealtime(!realtime);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100 p-5 gap-5">
      {/* Form Section - 30% */}
      <div className="w-full sm:w-[30%] bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Create a Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="blogTitle"
            placeholder="Blog Title"
            value={formData.blogTitle}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="blogDescrioption"
            placeholder="Blog Description"
            value={formData.blogDescrioption}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600"
          >
            Submit Blog
          </button>
        </form>
      </div>

      {/* Blog Section - 70% */}
      <div className="w-full sm:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-5">
        {blog?.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative"
          >
            {/* View Button */}
            <button className="absolute top-3 right-3 bg-blue-500 text-white text-sm px-3 py-1 rounded-xl hover:bg-blue-600">
              View
            </button>

            {/* Banner */}

            <img
              src={blog.image}
              alt="Banner"
              className="w-full h-80 object-cover"
            />

            {/* Title & Description */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{blog.blogTitle}</h3>
              <p className="text-gray-600 mt-2">{blog.blogDescrioption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

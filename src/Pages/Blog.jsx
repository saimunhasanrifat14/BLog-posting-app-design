import React, { useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Discover the Beauty of Nature",
      description:
        "Explore stunning landscapes, tranquil forests, and breathtaking views.",
      bannerURL: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      id: 2,
      title: "Mastering Web Development",
      description:
        "Learn modern tools, frameworks, and best practices in frontend development.",
      bannerURL: "https://images.unsplash.com/photo-1517430816045-df4b7de01f66",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    banner: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      id: Date.now(),
      ...formData,
      bannerURL: formData.banner ? URL.createObjectURL(formData.banner) : "",
    };
    setBlogs([newBlog, ...blogs]);
    setFormData({ title: "", description: "", banner: null });
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100 p-5 gap-5">
      {/* Form Section - 30% */}
      <div className="w-full sm:w-[30%] bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Create a Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="description"
            placeholder="Blog Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-xl focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="file"
            name="banner"
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
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden relative"
          >
            {/* View Button */}
            <button className="absolute top-3 right-3 bg-blue-500 text-white text-sm px-3 py-1 rounded-xl hover:bg-blue-600">
              View
            </button>

            {/* Banner */}
            {blog.bannerURL && (
              <img
                src={blog.bannerURL}
                alt="Banner"
                className="w-full h-40 object-cover"
              />
            )}

            {/* Title & Description */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

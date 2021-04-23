import React, { useState, useEffect } from 'react'
import blogServices from '../services/blogs'

const Context = React.createContext()

export const BlogsContextProvider = ({children}) => {
    const [blogs, setBlogs] = useState([])

    useEffect( () => {
        (async () => {
            const blogs = await blogServices.getBlogs()
            setBlogs(blogs)
        })()
    }, [])

    const createBlogContext = (createdBlog) => {
        setBlogs(blogs.concat(createdBlog))
    }

    const editBlogContext = (editedBlog) => {
        const updatedblogs = blogs.map(b => b.id !== editedBlog.id ? b : editedBlog)
        setBlogs(updatedblogs)
    }

    const deleteBlogContext = (blogId) => {
        const updatedBlogs = blogs.filter(b => b.id !== blogId)
        setBlogs(updatedBlogs)
    }

    return (
        <Context.Provider 
            value={{
                blogs, 
                createBlogContext, 
                editBlogContext, 
                deleteBlogContext
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Button, Box } from '@material-ui/core'
import blogServices from '../../services/blogs'
import BlogsContext from '../../context/BlogsContext'
import EditForm from './components/EditForm'

const useStyles = makeStyles({
    root: {
        marginTop: 50,
        border: '1px solid #e6e6e6',
        boxShadow: '0px 0px 30px -20px rgba(0,0,0,0.75);',
        borderRadius: 20,
        padding: 20
    },
    title: {
        marginBottom: 50
    },
    content: {
        padding: 20,
    },
    user: {
        marginBottom: 20 
    }
})

const Details = () => {
    const classes = useStyles()
    const [blog, setBlog] = useState(null)
    const [edit, setEdit] = useState(false)

    const id = useParams().id
    const { blogs } = useContext(BlogsContext)
    
    useEffect(() => {
        (async () => {
            if(!(id > 100)){
                const blogIsContext = blogs.find(b => b.id === Number(id))
                if(blogIsContext.isEdited){
                    setBlog(blogIsContext)
                } else {
                    const blog = await blogServices.getBlogById(id)
                    setBlog(blog)
                }              
            } else {
                const blogIsContext = blogs.find(b => b.id === Number(id))
                setBlog(blogIsContext)
            }
        })()
    }, [id, blogs])

    
    return (
        <Container className={classes.root}>
            <Typography 
                variant="h4" 
                component="h2"
                className={classes.title}
            >
                Details            
            </Typography>
            {blog && 
                <Container fixed>
                    <Typography variant="h5" component="h2">
                        {blog.title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        component="p"
                        className={classes.content}
                    >
                        {blog.body}
                    </Typography>
                    <Typography
                        className={classes.user}
                    >
                        userId: {blog.userId}
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="default"
                        onClick={() => setEdit(!edit)}
                    >
                        Edit
                    </Button>
                    <Box style={{ display: edit ? '' : 'none' }}>
                        <EditForm 
                            id={blog.id}
                            title={blog.title}
                            body={blog.body}
                            userId={blog.userId}
                            setEdit={setEdit}
                        />
                    </Box>
                </Container>
            }
        </Container>
    )
}

export default Details
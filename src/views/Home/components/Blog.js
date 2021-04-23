import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Button } from '@material-ui/core'
import BlogsContext from '../../../context/BlogsContext'
import blogServices from '../../../services/blogs'

const useStyles = makeStyles({
    root: {
        border: '1px solid #e6e6e6',
        boxShadow: '0px 0px 30px -20px rgba(0,0,0,0.75);',
        borderRadius: 20,
        margin: 30
    },
    button: {
      margin: 10,
    },
  })

const Blog = ({id, title}) => {
    const classes = useStyles()
    const { deleteBlogContext } = useContext(BlogsContext)

    const handleDeletePost = async (blogId) => {
        try {
            await blogServices.deleteBlog(blogId)
            deleteBlogContext(blogId)
        } catch (error) {
            console.log(error)
        }    
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Link to={`/details/${id}`} style={{ textDecoration: 'none'}}>
                    <Button
                        variant="contained"
                        className={classes.button}
                    >
                        Details
                    </Button>
                </Link>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDeletePost(id)}
                    className={classes.button}
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    )
}

export default Blog
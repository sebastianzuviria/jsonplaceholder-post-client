import React, { useContext } from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BlogsContext from '../../context/BlogsContext'
import Blog from './components/Blog'

const useStyles = makeStyles({
    root: {
      marginTop: 50
    },
})

const Home = () => {
    const classes = useStyles()
    const { blogs } = useContext(BlogsContext)
    
    return (
        <Container className={classes.root} fixed>
            <Typography variant="h4" component="h2">Blogs</Typography>
            {blogs.map(b => 
                <Blog 
                    key={b.id}
                    id={b.id}
                    title={b.title}
                />    
            )}
        </Container>
    )
}

export default Home
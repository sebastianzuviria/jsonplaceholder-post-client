import React, { useState, useContext } from 'react'
import { 
    Container, 
    FormControl, 
    InputLabel, 
    FilledInput, 
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import blogServices from '../../../services/blogs'
import BlogsContext from '../../../context/BlogsContext'

const useStyles = makeStyles({
    root: {
        width: 'auto',
        margin: 40,
        border: '1px solid #e6e6e6',
        boxShadow: '0px 0px 30px -20px rgba(0,0,0,0.75);',
        borderRadius: 20     
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        margin: 10,
    },
    input: {
        margin: 20
    }
})

const EditForm = ({ id, title, body, userId, setEdit }) => {
    const classes = useStyles()

    const [editedTitle, setEditedTitle] = useState(title)
    const [editedBody, setEditedBody] = useState(body)
    const [editedUserId, setEditedUserId] = useState(userId)

    const { editBlogContext } = useContext(BlogsContext)

    const handleEditBlog = async (e) => {
        e.preventDefault()

        const newBlog = {
            id: id,
            title: editedTitle,
            body: editedBody,
            userId: editedUserId,
            isEdited: true
        }

        try {
            const editedBlog = await blogServices.editBlog(newBlog)
            editBlogContext(editedBlog)
            setEdit(false)
        } catch (error) {
            console.log(error)
        }    
    }

    return (
        <Container className={classes.root}>
            <form onSubmit={handleEditBlog} className={classes.form}>
                <FormControl variant="filled" className={classes.input}>
                    <InputLabel htmlFor="component-filled">Title</InputLabel>      
                    <FilledInput
                        type='text'
                        value={editedTitle}
                        onChange={({ target }) => setEditedTitle(target.value)}  
                    />
                
                </FormControl>
                <FormControl variant="filled" className={classes.input}>        
                    <InputLabel htmlFor="component-filled">Body</InputLabel>
                    <FilledInput
                        type='text'
                        value={editedBody} 
                        onChange={({ target }) => setEditedBody(target.value)}
                    />
                </FormControl>
                <FormControl variant="filled" className={classes.input}>    
                    <InputLabel htmlFor="component-filled"> User ID </InputLabel>
                    <FilledInput
                        type='number'
                        value={editedUserId} 
                        onChange={({ target }) => setEditedUserId(target.value)}
                    />
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary" 
                    type='submit'
                    className={classes.button}
                >
                    Confirm
                </Button>  
            </form>
        </Container>
    )
}

export default EditForm
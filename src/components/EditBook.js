import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';

function EditBook({ currentBook, updateBook }) {

  const navigate = useNavigate()

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    quantity: "",
  })

  const formik = useFormik({
    initialValues: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      quantity: book.quantity,
    },
    onSubmit: values => {
      handleUpdate(values);
      navigate('/');
      console.log(values);
    }
  })
  console.log(book);
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:3011/books/${id}`)
      .then(response => {
        setBook(response.data); formik.setValues({
          id: response.data.id,
          title: response.data.title,
          author: response.data.author,
          genre: response.data.genre,
          quantity: response.data.quantity,
          borrowedMember : response.data.borrowedMember
        })
      })   
  }, [])


  const handleUpdate = (values) => {
    updateBook(values)
  }

  return (
    <div>
      <Modal.Dialog className='modal-dialog'>
        <Modal.Header className='modal-header'>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>

        <Modal.Body className='modal-body'>
          <form className="signin-form" >
            <label className="signin-label">Title of the book</label>
            <input className="signin-input" type='text' placeholder='Enter Title' name='title' onChange={formik.handleChange} value={formik.values.title} />
            
            <label className="signin-label">Name of the author</label>
            <input className="signin-input" type='text' placeholder='Enter name of the author' name='author' onChange={formik.handleChange} value={formik.values.author} />
            
            <label className="signin-label">Genre</label>
            <input className="signin-input" type='text' placeholder='Enter book genre' name='genre' onChange={formik.handleChange} value={formik.values.genre} />

            <label className="signin-label">Quantity</label>
            <input className="signin-input" type='number' placeholder='Enter total number of books' name='quantity' onChange={formik.handleChange} value={formik.values.quantity} />
          </form>
        </Modal.Body>

        <Modal.Footer className='modal-footer' >
          <Button variant="danger" onClick={() => navigate('/')}>Close</Button>
          <Button variant="success" onClick={formik.handleSubmit}>Update Book</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}

export default EditBook
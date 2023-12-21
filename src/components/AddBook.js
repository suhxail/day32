import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, useNavigate } from 'react-router-dom';

function AddBook({ addBook }) {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      id:"",
      title: "",
      author: "",
      genre: "",
      quantity: "",     
    },
    onSubmit: values  => {
      addBook(values)
      console.log(values)
      navigate('/')
    }
  })


  return (
    <div>          
        <Modal.Dialog className='modal-dialog'>
          <Modal.Header className='modal-header'>
            <Modal.Title>Add a new book</Modal.Title>
          </Modal.Header>

          <Modal.Body className='modal-body'>              
            <form className="signin-form" >
              <label className="signin-label">Title of the book</label>
              <input className="signin-input" type='text' placeholder='Enter Title' name='title' onChange={formik.handleChange} value={formik.values.title} />
              {/* <br></br> */}
              <label className="signin-label">Name of the author</label>
              <input className="signin-input" type='text' placeholder='Enter name of the author' name='author' onChange={formik.handleChange} value={formik.values.author} />
              {/* <br></br> */}
              <label className="signin-label">Genre</label>
              <input className="signin-input" type='text' placeholder='Enter book genre' name='genre' onChange={formik.handleChange} value={formik.values.genre} />

              <label className="signin-label">Quantity</label>
              <input className="signin-input" type='number' placeholder='Enter total number of books' name='quantity' onChange={formik.handleChange} value={formik.values.quantity} />
            </form>
          
          </Modal.Body>

          <Modal.Footer className='modal-footer' >
            <Button variant="danger" onClick={() => navigate('/')}>Close</Button>
            <Button variant="success" onClick={formik.handleSubmit}>Add Book</Button>
          </Modal.Footer>
        </Modal.Dialog>      
    </div>
  )
}

export default AddBook
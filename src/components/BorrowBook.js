import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BorrowBook({ bookList, borrowBook, showBorrowedMember }) {


    const [book, setBook] = useState([]);
    const [viewSelectedBook, setViewSelectedBook] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3011/books')
            .then(response => {
                setBook(response.data);
                // formik.setValues({ title: response.data.title, id:response.data.id})
            })
    }, [])


    const formik = useFormik({
        initialValues: {
            title: book.title,
            id:book.id 
        },
        onSubmit: values => {
            handleBorrow(values)
            console.log(values)
            navigate('/')
        }
    })

    const {id} = useParams();
    const {name} = useParams()

    const handleBorrow = (values) => {
        console.log(values)
        if (book) {
            borrowBook(values.id,id);            
            navigate('/')
        } else {
            alert('Please select a book');
        }
    } 


    return (
        <div>
            <Modal.Dialog className='modal-dialog'>
                <Modal.Header className='modal-header'>
                    <Modal.Title>Borrow a book</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body'>
                    <form className="signin-form">

                        <label className="signin-label">Select a book from the dropdown</label>
                        <select name='id' type="text" onChange={formik.handleChange} value={formik.values.id}>
                            <option value="">Select a book</option>
                            {
                                bookList && bookList.map(data => (<option key={data.id} value={data.id}>{data.title}</option>))
                            }
                        </select>

                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer' >
                    <Button variant="danger" onClick={() => navigate('/')}>Close</Button>
                    <Button variant="success" onClick={formik.handleSubmit} >Borrow Book</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default BorrowBook




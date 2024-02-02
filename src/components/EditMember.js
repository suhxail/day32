import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';

function EditMember({ currentMember, updateMember, memberIndex, membershipType }) {

    const navigate = useNavigate();

    const [member, setMember] = useState({
        name: "",
        contactNumber: "",
        email: "",
        address: "",
        membershipType: ""
    })



    const formik = useFormik({
        initialValues: {
            name: currentMember.name,
            contactNumber: currentMember.contactNumber,
            email: currentMember.email,
            address: currentMember.address,
            membershipType: currentMember.membershipType,
        },
        onSubmit: values => {
            handleUpdate(values);
            console.log(values)
            navigate('/')
        }
    })
    const { id } = useParams();

    useEffect(() => {
        axios           
            .get(`https://65afcf762f26c3f2139bccdc.mockapi.io/members/${id}`)
            .then(response => {
                setMember(response.data); formik.setValues({
                    id: response.data.id,
                    name: response.data.name,
                    contactNumber: response.data.contactNumber,
                    email: response.data.email,
                    address: response.data.address,
                    membershipType: response.data.membershipType,
                    booksBorrowed: response.data.booksBorrowed
                })
            })
    }, [])


    const handleUpdate = (values) => {
        updateMember(values)
    }

    return (
        <div>
            <Modal.Dialog className='modal-dialog'>
                <Modal.Header className='modal-header'>
                    <Modal.Title>Edit member</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body'>
                    <form className="signin-form">
                        <label className="signin-label">Name of the member</label>
                        <input className="signin-input" type='text' placeholder='Enter name of the member' name='name' onChange={formik.handleChange} value={formik.values.name} />
                        
                        <label className="signin-label">Contact Number</label>
                        <input className="signin-input" type='text' placeholder='Enter Contact Number' name='contactNumber' onChange={formik.handleChange} value={formik.values.contactNumber} />
                        
                        <label className="signin-label">Email</label>
                        <input className="signin-input" type='text' placeholder='Enter Email' name='email' onChange={formik.handleChange} value={formik.values.email} />

                        <label className="signin-label">Address</label>
                        <input className="signin-input" type='text' placeholder='Enter full address' name='address' onChange={formik.handleChange} value={formik.values.address} />

                        <label className="signin-label">Membership Type</label>
                        <select className="signin-input" name='membershipType' type="text" onChange={formik.handleChange} value={formik.values.membershipType}>
                            {membershipType.map(d => (<option>{d}</option>))}
                        </select>

                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer' >
                    <Button variant="danger" onClick={() => navigate('/')}>Close</Button>
                    <Button variant="success" onClick={formik.handleSubmit} >Update Member</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default EditMember
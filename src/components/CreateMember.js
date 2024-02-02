import { useFormik } from 'formik';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function CreateMember({ addMember, membershipType }) {
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            id:"",
            name: "",
            contactNumber: "",
            email: "",
            address: "",
            membershipType: "",
        },
        onSubmit: values => {
            addMember(values)
            console.log(values)
            navigate('/')
        }
    })
    return (
        <div>
            <Modal.Dialog className='modal-dialog'>
                <Modal.Header className='modal-header'>
                    <Modal.Title>Create a new member</Modal.Title>
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
                            <option value="">Choose a membership type</option>
                            {
                                membershipType.map(d => (<option>{d}</option>))
                            }
                        </select>
                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer' >
                    <Button variant="danger" onClick={() => navigate('/')}>Close</Button>
                    <Button variant="success" onClick={formik.handleSubmit} >Add Member</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default CreateMember
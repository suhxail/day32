import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { FaPlusCircle } from "react-icons/fa";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import axios from 'axios';

function Dashboard({ bookList, memberList, editBook, editMember, deleteBook, deleteMember, borrowBook, setLoadMember, loadMember}) {
  const [key, setKey] = useState('home');
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const navigate = useNavigate();

  const EditBook = (book, bookIndex) => {   
    editBook(book, bookIndex);    
    if(book.borrowedMember.length != 0) {
      alert("Cannot edit book while it is lended")
    } else {
      navigate(`edit-book/${book.id}`);
    }
    
    console.log(book)
  }

  const EditMember = (member, memberIndex) => {
    editMember(member, memberIndex);
    if(member.booksBorrowed.length != 0) {
      alert("Cannot edit member before returning all the books")
    } else {
      navigate(`edit-member/${member.id}`)
    }
    
    console.log(member)
  } 

  const handleReturn = async (i, ind) => {
    console.log(i, ind)
    let temp = {};
    let tempBook = {};

    memberList.map((member, index) => {
      if (i == index) {
        console.log(i, index)
        temp = member
      }
    })

    bookList.map((book, index) => {
      if (temp.booksBorrowed.includes(book.title)) {
        tempBook = book
      }
    })

    console.log(temp)
    let a = temp.booksBorrowed.filter((book, index) => {
      if (index !== ind) {
        return book
      }
    })

    console.log(tempBook)

    let b = tempBook.borrowedMember.filter((member, index) => {
      console.log(index, ind, member)
      if (index !== ind) {
        return member
      }
    })

    console.log(temp, a);
    temp["booksBorrowed"] = a;
    tempBook["borrowedMember"] = b

    await axios      
      .put(`https://65afcf762f26c3f2139bccdc.mockapi.io/members/${temp.id}`, temp)
    setLoadMember(!loadMember)

    await axios     
      .put(`https://65afcf762f26c3f2139bccdc.mockapi.io/books/${tempBook.id}`, tempBook)

  }

  return (
    <div className='dashboard'>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Books" className='Tab'>
          <div>
            <FaPlusCircle className='bookList-icon' onClick={() => navigate('/add-book')} />
            <p className='memberList-icon-text'>Click here to add a new book</p>
          </div>
          <div className="col text-start">

            <table className="table table-striped">
              <thead>
                <tr className="table-primary">
                  <th>Id</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Quantity</th>
                  <th>Available</th>
                  <th>Borrowed Member</th>
                  <th>Actions</th>
                </tr>

                {bookList && bookList.map((book, id) => (
                  book?.title &&

                  <tr className="table-secondary" key={id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.quantity}</td>
                    <td>{book.quantity - book.borrowedMember.length}</td>
                    <td>{book.borrowedMember && book.borrowedMember.map(d => (<p>{d}</p>))}</td>
                    {book ?
                      <td>
                        <button className="btn btn-primary" onClick={() => EditBook(book)} >Edit</button>
                        <button className="btn btn-danger" onClick={() => {
                          book.borrowedMember.length === 0
                            ?
                            deleteBook(book.id)
                            :
                            alert("Cannot delete book when it is still lended")
                        }}>
                          Delete
                        </button>
                      </td>
                      : ""
                    }
                  </tr>
                ))}

              </thead>
            </table>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Members" className='Tab'>
          <div>
            <FaPlusCircle className='memberList-icon' onClick={() => navigate('/add-member')} />
            <p className='memberList-icon-text'>Click here to add a new member</p>
            <div className="col text-start">
              <table className="table table-striped">
                <thead>
                  <tr className="table-primary">
                    <th>Id</th>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Books Borrowed</th>
                    <th>Membership Type</th>
                    <th>Actions</th>
                  </tr>

                  {memberList && memberList.map((member, id) => {                   
                    console.log(member)
                    return <tr className="table-secondary" key={member.id}>

                      <td>{member.id}</td>
                      <td>{member.name}</td>
                      <td>{member.contactNumber}</td>
                      <td>{member.email}</td>
                      <td>{member.address}</td>

                      <td>
                        <table>
                          <thead>
                            <tr>
                              <td>
                                {member.booksBorrowed && member.booksBorrowed.map(d => (<p>{d}</p>))}

                                {member ?
                                  <button onClick={() => navigate(`borrow-book/${member.id}`)}>Borrow Book</button>
                                  : ""
                                }

                              </td>

                              {
                                member.booksBorrowed.map((book, index) => {
                                  if (book.length >= 1) {
                                    return <tr> <td> <button onClick={() => handleReturn(id, index)}>Return</button> </td>   </tr>
                                  }
                                })
                              }

                            </tr>

                          </thead>
                        </table>
                      </td>


                      <td>{member.membershipType}</td>
                      {member ?
                        <td>
                          <button className="btn btn-primary" onClick={() => EditMember(member)} >Edit</button>
                          <button className="btn btn-danger" onClick={() => {
                            member.booksBorrowed.length === 0
                              ?
                              deleteMember(member.id)
                              :
                              alert("Cannot delete member before returning all the books")
                          }}>
                            Delete
                          </button>
                        </td> : ""
                      }
                    </tr>
                  })}

                </thead>
              </table>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Dashboard
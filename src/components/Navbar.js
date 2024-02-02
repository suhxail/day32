import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';
import AddBook from './AddBook';
import EditBook from './EditBook';
import CreateMember from './CreateMember';
import EditMember from './EditMember';
import BorrowBook from './BorrowBook';


function Navbar() {


    const [bookList, setBookList] = useState([]);
    const [currentBook, setCurrentbook] = useState([]);
    const [bookIndex, setBookIndex] = useState();
    const [currentMember, setCurrentMember] = useState([]);
    const [memberIndex, setMemberIndex] = useState();
    const [memberList, setMemberList] = useState([]);
    const [loadMember, setLoadMember] = useState(false);


    const membershipType = ["School Student", "University Graduate", "Employed"]

    useEffect(() => {
        axios
            .get('https://65afcf762f26c3f2139bccdc.mockapi.io/books')
            .then(response => setBookList(response.data))
    }, [])

    const addBook = (book) => {
        let newBook = { ...book };
        newBook.id = bookList.length + 1;
        newBook.borrowedMember = [];
        setBookList([...bookList, newBook]);

        axios
            .post('https://65afcf762f26c3f2139bccdc.mockapi.io/books', newBook)
    }

    const editBook = (book, bookIndex) => {
        setCurrentbook(book);
        setBookIndex(bookIndex);
        console.log(book, bookIndex);
    }

    const updateBook = (updatedBook) => {
        console.log(updatedBook);
        let BookList = [...bookList];
        BookList[updatedBook.id - 1] = { ...updatedBook };
        console.log(BookList);
        setBookList([...BookList]);

        axios
            .put(`https://65afcf762f26c3f2139bccdc.mockapi.io/books/${updatedBook.id}`, updatedBook)
    }

    const deleteBook = (id) => {
        const currentBookList = [...bookList];
        const newBookList = currentBookList.filter((book, index) => book.id !== id);
        setBookList(newBookList);
        console.log(newBookList);

        axios
            .delete(`https://65afcf762f26c3f2139bccdc.mockapi.io/books/${id}`)
    }

    useEffect(() => {

        axios
            .get('https://65afcf762f26c3f2139bccdc.mockapi.io/members')
            .then(response => setMemberList(response.data))
    }, [loadMember])


    const addMember = (member) => {
        let newMember = { ...member };
        newMember.id = memberList.length + 1;
        newMember.booksBorrowed = [];
        setMemberList([...memberList, newMember]);

        axios
            .post('https://65afcf762f26c3f2139bccdc.mockapi.io/members', newMember)
    }

    const editMember = (member, memberIndex) => {
        setCurrentMember(member);
        setMemberIndex(memberIndex);
    }

    const updateMember = (updatedMember) => {
        let MemberList = [...memberList];
        MemberList[updatedMember.id - 1] = { ...updatedMember };
        console.log(MemberList);
        setMemberList([...MemberList]);

        axios
            .put(`https://65afcf762f26c3f2139bccdc.mockapi.io/members/${updatedMember.id}`, updatedMember)
    }

    const deleteMember = (id) => {
        console.log(id)
        const currentMemberList = [...memberList];
        console.log(memberList)
        const newMemberList = currentMemberList.filter((member, index) => member.id !== id);
        setMemberList(newMemberList);
        console.log(newMemberList);

        axios
            .delete(`https://65afcf762f26c3f2139bccdc.mockapi.io/members/${id}`)
    }



    const borrowBook = (BookId, MemberId) => {
        console.log(BookId, MemberId)
        let data = {};

        let bookData = {};
        console.log(memberList)
        const updatedMembers = memberList.map((member) => {
            if (member.id == MemberId) {
                console.log(member.booksBorrowed)
                const a = new Set([...member.booksBorrowed || [], bookList[BookId - 1].title])
                const b = { ...member, booksBorrowed: [...a] };
                return b;
            }
        });

        data = updatedMembers[MemberId - 1];

        const updatedBooks = bookList.map((book) => {
            if (book.id == BookId) {
                console.log(book.borrowedMember)
                let c = new Set([...book.borrowedMember || [], data.name]);
                let d = { ...book, borrowedMember: [...c] };
                return d;
            }
        })

        bookData = updatedBooks[BookId - 1];

        axios
            .put(`https://65afcf762f26c3f2139bccdc.mockapi.io/members/${MemberId}`, data);

        axios
            .get('https://65afcf762f26c3f2139bccdc.mockapi.io/members')
            .then(response => setMemberList(response.data));

        axios
            .put(`https://65afcf762f26c3f2139bccdc.mockapi.io/books/${BookId}`, bookData)
            .then(response => {
                axios
                    .get('https://65afcf762f26c3f2139bccdc.mockapi.io/books')
                    .then(response => setBookList(response.data))
            })
    }

    return (
        <>
            <nav>
                <h3 className='nav-title'>Library Management System</h3>
            </nav>
            <Routes>
                <Route path='/' element={<Dashboard bookList={bookList} memberList={memberList} editBook={editBook} editMember={editMember} deleteBook={deleteBook} deleteMember={deleteMember} loadMember={loadMember} setLoadMember={setLoadMember} />} />
                <Route path='/add-book' element={<AddBook addBook={addBook} />} />
                <Route path='/add-member' element={<CreateMember addMember={addMember} membershipType={membershipType} />} />
                <Route path='/edit-book/:id' element={<EditBook currentBook={currentBook} updateBook={updateBook} bookIndex={bookIndex} />} />
                <Route path='/edit-member/:id' element={<EditMember currentMember={currentMember} updateMember={updateMember} memberIndex={memberIndex} membershipType={membershipType} />} />
                <Route path='/borrow-book/:id' element={<BorrowBook bookList={bookList} borrowBook={borrowBook} />} />
            </Routes>
        </>

    )
}

export default Navbar
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
            .get('http://localhost:3011/books')
            .then(response => setBookList(response.data))
    }, [])

    const addBook = (book) => {
        let newBook = { ...book };
        newBook.id = bookList.length + 1;
        newBook.borrowedMember = [];
        setBookList([...bookList, newBook]);

        axios
            .post('http://localhost:3011/books', newBook)
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
            .put(`http://localhost:3011/books/${updatedBook.id}`, updatedBook)
    }

    const deleteBook = (id) => {
        const currentBookList = [...bookList];
        const newBookList = currentBookList.filter((book, index) => book.id !== id);
        setBookList(newBookList);
        console.log(newBookList);

        axios
            .delete(`http://localhost:3011/books/${id}`)
    }

    useEffect(() => {
        axios
            .get('http://localhost:3012/members')
            .then(response => setMemberList(response.data))
    }, [loadMember])


    const addMember = (member) => {
        let newMember = { ...member };
        newMember.id = memberList.length + 1;
        newMember.booksBorrowed = [];
        setMemberList([...memberList, newMember]);

        axios
            .post('http://localhost:3012/members', newMember)
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
            .put(`http://localhost:3012/members/${updatedMember.id}`, updatedMember)
    }

    const deleteMember = (id) => {
        console.log(id)
        const currentMemberList = [...memberList];
        console.log(memberList)
        const newMemberList = currentMemberList.filter((member, index) => member.id !== id);
        setMemberList(newMemberList);
        console.log(newMemberList);

        axios
            .delete(`http://localhost:3012/members/${id}`)
    }



    const borrowBook = (BookId, MemberId) => {
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
            .put(`http://localhost:3012/members/${MemberId}`, data);
        axios
            .get('http://localhost:3012/members')
            .then(response => setMemberList(response.data));

        axios
            .put(`http://localhost:3011/books/${BookId}`, bookData)
            .then(response => {
                axios
                    .get('http://localhost:3011/books')
                    .then(response => setBookList(response.data))
            })



    }

    const showBorrowedMember = (name, BookId) => {

        let bookData = {};


        bookData = updateBook[BookId - 1];

        axios
            .put(`http://localhost:3011/books/${BookId}`, bookData)

        axios
            .get('http://localhost:3011/books')
            .then(response => setBookList(response.data))
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
                <Route path='/borrow-book/:id' element={<BorrowBook bookList={bookList} borrowBook={borrowBook} showBorrowedMember={showBorrowedMember} />} />
            </Routes>
        </>

    )
}

export default Navbar
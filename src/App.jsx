import React, { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Booklist from "./components/booklist/Booklist";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Modal from "./components/modal/Modal";
import Search from "./components/search/Search";
import Toast from "./components/toast/Toast";
import { ToastContext } from "./context/ToastContext";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState([
    { id: nanoid(), title: "A Smarter Way to Learn HTM & CSS", author: "Mark Myers", status: false },
    { id: nanoid(), title: "A Smarter Way to Learn JavaScript", author: "Mark Myers", status: false },
    { id: nanoid(), title: "JavaScript & JQuery", author: "Jon Duckett", status: false },
    { id: nanoid(), title: "The Phoenix Project", author: "Ed", status: true }
  ]);
  const [booksLength, setBooksLength] = useState(books.length);
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [titleText, setTitleText] = useState("");
  const [authorText, setAuthorText] = useState("");
  const [position, setPosition] = useState("top-left");
  const { state, dispatch } = useContext(ToastContext);

  const handleNotification = (type, title, message) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { id: nanoid(), type, title, message }
    });
  };

  useEffect(() => {
    setBooksLength(books.length);
  }, [books]);

  const clearAll = () => {
    setUpdateId(null);
    setTitleText("");
    setAuthorText("");
  };

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => {
    setModalOpen(false);
    clearAll();
  };

  const handleAddBook = (event) => {
    event.preventDefault();
    const newBook = { id: nanoid(), title: titleText, author: authorText, status: false };
    setBooks([...books, newBook]);
    handleCloseModal();
    handleNotification("SUCCESS", "Success", "Book added successfully.");
  };

  const handleSetUpdateBook = (id) => {
    const onUpdateBook = books.find((book) => book.id === id);
    if (onUpdateBook) {
      setUpdateId(onUpdateBook.id);
      setTitleText(onUpdateBook.title);
      setAuthorText(onUpdateBook.author);
      handleOpenModal();
    }
  };

  const handleUpdateBook = (event) => {
    event.preventDefault();
    setBooks(books.map((book) => book.id === updateId ? { ...book, title: titleText, author: authorText } : book));
    handleCloseModal();
    handleNotification("SUCCESS", "Success", "Successfully Updated.");
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    handleNotification("SUCCESS", "Success", "Successfully Deleted.");
  };

  const handleMarkBook = (id) => {
    setBooks(books.map((book) => book.id === id ? { ...book, status: !book.status } : book));
    handleNotification("SUCCESS", "Success", "Successfully Updated.");
  };

  return (
    <>
      <Header booksLength={booksLength} />
      <Search searchText={searchText} handleSearchText={setSearchText} />
      <Booklist
        completeBooks={books.filter(
          (book) =>
            book.status &&
            book.title.toLowerCase().includes(searchText.toLowerCase())
        )}
        incompleteBooks={books.filter(
          (book) =>
            !book.status &&
            book.title.toLowerCase().includes(searchText.toLowerCase())
        )}
        handleSetUpdateBook={handleSetUpdateBook}
        handleDeleteBook={handleDeleteBook}
        handleMarkBook={handleMarkBook}
        handleOpenModal={handleOpenModal}
      />
      <Footer />
      <Modal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        updateId={updateId}
        titleText={titleText}
        handleTitleText={setTitleText}
        authorText={authorText}
        handleAuthorText={setAuthorText}
        handleAddBook={handleAddBook}
        handleUpdateBook={handleUpdateBook}
      />
      <Toast position={position} autoDeleteInterval={3000} />
    </>
  );
}

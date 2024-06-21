import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

import "./modal.css";

const Modal = (props) => {
  return (
    <div
      className={
        props.modalOpen ? "modal__wrapper active-modal" : "modal__wrapper"
      }
    >
      <div className="modal__backdrop" onClick={props.handleCloseModal}></div>
      <div className="modal__box">
        <div className="modal__header">
          {props.updateId === null ? (
            <h2>Add New Book</h2>
          ) : (
            <h2>Update Book</h2>
          )}
          <RiCloseCircleLine
            className="icon"
            size="1.5rem"
            onClick={props.handleCloseModal}
          />
        </div>
        <div className="modal__form">
          <form
            onSubmit={
              props.updateId === null
                ? props.handleAddBook
                : props.handleUpdateBook
            }
          >
            <div className="input-form">
              <input
                type="text"
                value={props.titleText}
                onChange={(event) => props.handleTitleText(event.target.value)}
                required
              />
              <span>Book title</span>
            </div>
            <div className="input-form">
              <input
                type="text"
                value={props.authorText}
                onChange={(event) => props.handleAuthorText(event.target.value)}
                required
              />
              <span>Author</span>
            </div>
            <div className="action-form">
              <input
                className="btn btn-second"
                type="button"
                value="Cancel"
                onClick={props.handleCloseModal}
              />

              <input
                className="btn"
                type="submit"
                value={props.updateId === null ? "Add" : "Update"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

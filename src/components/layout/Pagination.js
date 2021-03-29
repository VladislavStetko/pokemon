import React, { Component } from "react";

export default function Pagination({ gotoNext, gotoPrev}) {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            {gotoPrev && (
              <button className="page-link" onClick={gotoPrev}>
                Попередня
              </button>
            )}
          </li>
          <li className="page-item">
            {gotoNext && (
              <button className="page-link" onClick={gotoNext}>
                Наступна
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

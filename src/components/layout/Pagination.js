import React, { Component } from "react";

export default function Pagination({ gotoNext, gotoPrev, page }) {
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
            <span className="page-link">{page/20+1}</span>
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

import React, { Component } from "react";

export default function Pagination({ gotoNext, gotoPrev, page }) {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            {gotoPrev && (
              <button class="page-link" onClick={gotoPrev}>
                Попередня
              </button>
            )}
          </li>
          <li class="page-item">
            <span className="page-link">{page/20+1}</span>
          </li>
          <li class="page-item">
            {gotoNext && (
              <button class="page-link" onClick={gotoNext}>
                Наступна
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

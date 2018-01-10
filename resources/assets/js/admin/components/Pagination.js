import React, { Component } from 'react';

export default function Pagination(props) {
    const {pagination, handleClick} = props;
    return(
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {pagination.last_page > 1 &&
                    <li
                        className={pagination.current_page === 1 ?
                            "page-item disabled"
                            :
                            "page-item"
                        }
                    >
                        <a
                            className="page-link"
                            href={`${pagination.url}?page=1`}
                            aria-label="Первая страница"
                            onClick={handleClick}
                        >
                            Первая страница
                            <span className="sr-only">Первая страница</span>
                        </a>
                    </li>
                }
                <li
                    className={pagination.prev_page === null ?
                        "page-item disabled"
                        :
                        "page-item"
                    }
                >
                    <a
                        className="page-link"
                        href={pagination.prev_page}
                        aria-label="Previous"
                        onClick={handleClick}
                    >
                        &laquo;
                        <span className="sr-only">Предыдущая</span>
                    </a>
                </li>

                {pagination.current_page-1 > 0 &&
                <li className="page-item">
                    <a
                        className="page-link"
                        href={`${pagination.url}?page=${pagination.current_page-1}`}
                        onClick={handleClick}
                    >
                        {pagination.current_page-1}
                    </a>
                </li>
                }
                <li className="page-item disabled"><a className="page-link" href="#">{pagination.current_page}</a></li>
                {pagination.current_page+1 <= pagination.last_page &&
                <li className="page-item">
                    <a
                        className="page-link"
                        href={`${pagination.url}?page=${pagination.current_page+1}`}
                        onClick={handleClick}
                    >
                        {pagination.current_page+1}
                    </a>
                </li>
                }
                <li
                    className={pagination.next_page === null ?
                        "page-item disabled"
                        :
                        "page-item"
                    }
                >
                    <a
                        className="page-link"
                        href={pagination.next_page}
                        aria-label="Next"
                        onClick={handleClick}
                    >
                        &raquo;
                        <span className="sr-only">Следующая</span>
                    </a>
                </li>
                {pagination.last_page > 1 &&
                <li
                    className={pagination.current_page === pagination.last_page ?
                        "page-item disabled"
                        :
                        "page-item"
                    }
                >
                    <a
                        className="page-link"
                        href={pagination.last_page_url}
                        aria-label="Последняя страница"
                        onClick={handleClick}
                    >
                        Последняя страница
                        <span className="sr-only">Последняя страница</span>
                    </a>
                </li>
                }
            </ul>
        </nav>
    );
};
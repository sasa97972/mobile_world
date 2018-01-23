import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';

export default class Comments extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            url: "/api/admin/comments",
            perPage: 10,
            load: true,
            comments: null,
            pagination: null,
            search: "",
            isSearch: false,
            button: false,
            sortBy: "created_at",
            sort: "asc"
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const url = this.state.url.search(/\?/igm) !== -1 ?
            `${this.state.url}&perPage=${this.state.perPage}&sortBy=${this.state.sortBy}&sort=${this.state.sort}`
            : `
            ${this.state.url}?perPage=${this.state.perPage}&sortBy=${this.state.sortBy}&sort=${this.state.sort}`;

        let settings = {
            "async": true,
            "crossDomain": true,
            "method": "GET",
            "headers": {
                token: this.props.token
            },
            "url": url,
        };

        const self = this;

        axios(settings).then(response => {
            const data = response.data;
            self.setState({
                comments: data.data,
                load: false,
                pagination: {
                    next_page: data.next_page_url,
                    prev_page: data.prev_page_url,
                    current_page: data.current_page,
                    last_page: data.last_page,
                    last_page_url: data.last_page_url,
                    url: data.path
                }
            })
        });
    }

    handleDelete(id) {
        if(!confirm("Вы действительно хотите удалить коммнтарий ?")) {
            return false;
        }

        let settings = {
            "async": true,
            "crossDomain": true,
            "method": "DELETE",
            "headers": {
                token: this.props.token
            },
            "url": `/api/admin/comments/${id}`,
        };

        const self = this;

        axios(settings).then(response => {
            self.getData();
        });
    }

    handlePagination(event) {
        event.preventDefault();
        event.target.blur();
        this.setState({url: event.target.href}, () => {
            this.getData();
        });
    }

    handleInput(event) {
        if(event.target.value) {
            this.setState({button: true})
        } else {
            this.setState({button: false})
        }
        this.setState({search: event.target.value});
    }

    handleSearch() {
        if(!this.state.button) {
            return;
        }
        this.setState({url: `/api/comments/search/${this.state.search}`, isSearch: true}, () => {
            this.getData();
        });
    }

    handleChangePerPage(event) {
        this.setState({perPage: event.target.options[event.target.selectedIndex].value}, () => {
            this.getData();
        });
    }

    handleChangeSort(event) {
        this.setState({sort: event.target.options[event.target.selectedIndex].value}, () => {
            this.getData();
        });
    }

    handleChangeSortBy(event) {
        this.setState({sortBy: event.target.options[event.target.selectedIndex].value}, () => {
            this.getData();
        });
    }

    handleSearchBack() {
        this.setState({search: "", isSearch: false, button: false, url: "/api/admin/comments"}, () => {
            this.getData();
        });
    }

    render() {
        return (
            <main role="main"
                  className= {this.state.load ?
                      "col-sm-9 ml-sm-auto col-md-10 pt-3 dash__main dash__main_load"
                      :
                      "col-sm-9 ml-sm-auto col-md-10 pt-3 dash__main"}
            >
                {this.state.load ?
                    <div className="loader">
                        <img
                            src="https://idt.taxmann.com/images/loading.gif"
                            alt="Loading"
                            className="loader__image"
                        />
                    </div>
                    :
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4">Комментарии</h1>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Поиск комментария"
                                            aria-label="Поиск комментария"
                                            onChange={(e) => {this.handleInput(e)}}
                                            value={this.state.search}
                                        />
                                        <div className="input-group-append">
                                            {this.state.isSearch &&
                                            <button
                                                className="btn btn-warning"
                                                type="button"
                                                onClick={() => {this.handleSearchBack()}}
                                            >
                                                Вернутся ко всем комментариям
                                            </button>
                                            }
                                            <button
                                                className={this.state.button ?
                                                    "btn btn-primary"
                                                    :
                                                    "btn btn-primary disabled"
                                                }

                                                type="button"
                                                onClick={() => {this.handleSearch()}}
                                            >
                                                Поиск
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group row">
                                    <label className="col-md-2 col-form-label">Количество комментариев на странице:</label>
                                    <div className="col-md-2 align-self-center">
                                        <select
                                            id="perPage"
                                            className="custom-select custom-select-md"
                                            onChange={(e) => {this.handleChangePerPage(e)}}
                                        >
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                        </select>
                                    </div>

                                    <label className="col-md-2 align-self-center col-form-label">Сортировать по:</label>
                                    <div className="col-md-2 align-self-center">
                                        <select
                                            id="sort"
                                            className="custom-select custom-select-md"
                                            onChange={(e) => {this.handleChangeSortBy(e)}}
                                        >
                                            <option value="id">Id</option>
                                            <option value="created_at">Дате создания</option>
                                            <option value="users.email">Автору</option>
                                            <option value="products.title">Продукту</option>
                                        </select>
                                    </div>

                                    <label className="col-md-2 align-self-center col-form-label">Порядок сортировки:</label>
                                    <div className="col-md-2 align-self-center">
                                        <select
                                            id="sort"
                                            className="custom-select custom-select-md"
                                            onChange={(e) => {this.handleChangeSort(e)}}
                                        >
                                            <option value="asc">По возрастанию</option>
                                            <option value="desc">По убыванию</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Имя пользователя</th>
                                            <th scope="col">Email пользователя</th>
                                            <th scope="col">Название продукта</th>
                                            <th scope="col">Комментарий</th>
                                            <th scope="col" className="dashboard__table-actions">Действия</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.comments.map((comment) => (
                                            <CommentBlock
                                                key={comment.id}
                                                id={comment.id}
                                                product={comment.product}
                                                user={comment.user}
                                                text={comment.comment}
                                                deleteComment={() => {this.handleDelete(comment.id)}}
                                            />
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12">
                                    <Pagination
                                        pagination={this.state.pagination}
                                        handleClick={(e) => {this.handlePagination(e)}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </main>
        );
    }
}

const CommentBlock = (props) => {
    const {id, user, product, text, deleteComment} = props;
    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{product.title}</td>
            <td>{text}</td>
            <td className="dashboard__table-actions">
                <div className="btn-group" role="group">
                    <Link
                        type="button"
                        role="button"
                        className="btn btn-secondary"
                        to={`/admin/comments/edit/${id}`}
                    >
                        Редактировать
                    </Link>
                    <button
                        type="button"
                        className="btn btn-secondary btn-danger"
                        onClick={deleteComment}
                    >
                        Удалить
                    </button>
                </div>
            </td>
        </tr>
    );
};



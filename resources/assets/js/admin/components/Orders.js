import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';

export default class Orders extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            url: "/api/admin/orders",
            perPage: 10,
            load: true,
            orders: null,
            pagination: null,
            search: "",
            isSearch: false,
            button: false,
            sortBy: "created_at",
            sort: "asc"
        };
        this.getData = this.getData.bind(this);
        this.completeOrder = this.completeOrder.bind(this);
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
                orders: data.data,
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
        if(!confirm("Вы действительно хотите удалить заказ ?")) {
            return false;
        }

        let settings = {
            "async": true,
            "crossDomain": true,
            "method": "DELETE",
            "headers": {
                token: this.props.token
            },
            "url": `/api/admin/orders/${id}`,
        };

        axios(settings).then(response => {
            this.getData();
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
        this.setState({url: `/api/phones/search/${this.state.search}`, isSearch: true}, () => {
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

    handleSearchBack() {
        this.setState({search: "", isSearch: false, button: false, url: "/api/admin/phones"}, () => {
            this.getData();
        });
    }

    completeOrder(id) {
        console.log(id);
        let settings = {
            "async": true,
            "crossDomain": true,
            "method": "PUT",
            "headers": {
                token: this.props.token
            },
            "url": `/api/admin/orders/${id}`,
        };

        axios(settings).then(response => {
            console.log(response.data);
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
                                <h1 className="display-4">Заказы</h1>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Поиск заказов"
                                            aria-label="Поиск заказов"
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
                                                Вернутся ко всем заказам
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
                                    <label className="col-md-2 col-form-label">Количество заказов на странице:</label>
                                    <div className="col-md-4 align-self-center">
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
                                    <label className="col-md-2 align-self-center col-form-label">Показывать сначала:</label>
                                    <div className="col-md-4 align-self-center">
                                        <select
                                            id="sort"
                                            className="custom-select custom-select-md"
                                            onChange={(e) => {this.handleChangeSort(e)}}
                                        >
                                            <option value="asc">Самые старые</option>
                                            <option value="desc">Самые новые</option>
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
                                            <th scope="col">Email Пользователя</th>
                                            <th scope="col">Имя пользователя</th>
                                            <th scope="col">Номер телефона</th>
                                            <th scope="col">Заказанные товары</th>
                                            <th scope="col">Сумарная стоимость</th>
                                            <th scope="col">Статус выполнения</th>
                                            <th scope="col" className="dashboard__table-actions">Действия</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.orders.map((order) => (
                                            <OrderBlock
                                                key={order.id}
                                                id={order.id}
                                                user={order.user}
                                                positions={order.positions}
                                                completed={order.completed}
                                                deleteOrder={() => {this.handleDelete(order.id)}}
                                                completeOrder={this.completeOrder}
                                                number={order.phone_number}
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

const OrderBlock = (props) => {
    const {id, user, positions, deleteOrder, completed, completeOrder, number} = props;
    let totalPrice = 0;
    {positions.map((position) => {
        totalPrice += position.product.price;
    })}
    return(
        <tr>
            <th scope="row">{id}</th>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{number}</td>
            <td>
                <ul>
                    {positions.map((position) => (
                        <li key={position.id}>{position.product.title} {position.product.price} Грн</li>
                    ))}
                </ul>
            </td>
            <td>{totalPrice} Грн</td>
            <td>{completed ? "Выполнен" : "Не выполнен"}</td>
            <td className="dashboard__table-actions">
                <div className="btn-group" role="group">
                    {/*<Link
                        type="button"
                        role="button"
                        className="btn btn-secondary"
                        to={`/admin/phones/edit/${id}`}
                    >
                        Подробнее
                    </Link>*/}
                    {!completed ?
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={completeOrder.bind(null, id)}
                        >
                            Выполнить
                        </button>
                    :""}
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={deleteOrder}
                    >
                        Удалить
                    </button>
                </div>
            </td>
        </tr>
    );
};



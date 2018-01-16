import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';


class CreateProduct extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category_id: 1,
            phone_id: 1,
            price: null,
            image: null,
            button: false,
            categories: null,
            phones: null,
            load: true
        };

        this.getInitialData = this.getInitialData.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.description && this.state.title) {
                this.setState({button: true});
            } else {
                this.setState({button: false});
            }
        })
    }

    componentDidMount() {
        this.getInitialData();
    }

    getInitialData() {
        let settings = {
            url: "/api/admin/products/create",
            "async": true,
            "crossDomain": true,
            "method": "get",
            "headers": {
                token: this.props.token
            },
        };

        const success = axios(settings).then(response =>  {
            const data = response.data;
            this.setState({
                load: false,
                categories: data.categories,
                phones: data.phones
            });
        });
    }

    saveData() {
        let settings = {
            url: "/api/admin/products",
            "async": true,
            "crossDomain": true,
            "method": "post",
            "headers": {
                token: this.props.token
            },
            "data": {

            }
        };

        const success = axios(settings).then(response =>  {
            if(response.statusText === "Created") {
                return true;
            }
        });

        return !!success;
    }

    handleBack() {
        $("#successModal").modal('hide');
        this.props.history.push("/admin/products");
    };

    handleChangeSelect(event) {
        this.setState({
            [event.target.name]: event.target.options[event.target.selectedIndex].value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(!this.state.button) {
            return false;
        }
        if(this.saveData()) {
            $("#successModal").modal('show');
        }
    }

    render() {
        return(
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
                            <div className="col-md-8">
                                <h1 className="display-4">Добавить новый товар</h1>
                            </div>
                            <div className="col-md-4 align-self-center">
                                <Link to="/admin/products" type="button" className="btn btn-warning btn-block" role="button">
                                    Вернуться назад
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form>

                                    <div className="form-group">
                                        <label>Название товара</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={this.state.title}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Описание товара</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="3"
                                            value={this.state.description}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label >Выберите категорию</label>
                                        <select
                                            className="custom-select"
                                            name="category_id"
                                            onChange={(e) => {this.handleChangeSelect(e)}}
                                            value={this.state.category_id}
                                        >
                                            {this.state.categories.map((category) => (
                                                <option value={category.id} key={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label >Выберите телефон</label>
                                        <select
                                            className="custom-select"
                                            name="phone_id"
                                            onChange={(e) => {this.handleChangeSelect(e)}}
                                            value={this.state.phone_id}
                                        >
                                            {this.state.phones.map((phone) => (
                                                <option value={phone.id} key={phone.id}>{phone.name} {phone.model}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Цена товара (в Грн)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={this.state.price}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Титульное изображение</label>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                name="title_image"
                                                onChange={(e) => {this.handleFile(e)}}
                                            />
                                            <label className="custom-file-label">Выберите изображение</label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className={this.state.button ?
                                            "btn btn-primary"
                                            :
                                            "btn btn-primary disabled"
                                        }
                                        onClick={(e) => {this.handleSubmit(e)}}
                                    >Добавить</button>
                                </form>
                            </div>
                        </div>
                    </div>}

                <div className="modal fade" id="successModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Категория успешно создана</h5>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                    onClick={() => {this.handleMore()}}
                                >Добавить ещё</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => this.handleBack()}
                                >
                                    Вернуться к категориям
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        );
    }
}

export default withRouter(CreateProduct);
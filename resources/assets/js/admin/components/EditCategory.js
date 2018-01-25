import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';


class EditCategory extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            alias: "",
            button: true,
            load: true
        }
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.description && this.state.name && this.state.alias) {
                this.setState({button: true});
            } else {
                this.setState({button: false});
            }
        })
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const url = `/api/admin/categories/${this.props.match.params.categoryId}`;

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
                name: data.name,
                description: data.description,
                alias: data.alias,
                load: false
            })
        });
    }

    saveData() {
        let settings = {
            url: `/api/admin/categories/${this.props.match.params.categoryId}`,
            "async": true,
            "crossDomain": true,
            "method": "PUT",
            "headers": {
                token: this.props.token
            },
            "data": {
                name: this.state.name,
                description: this.state.description,
                alias: this.state.alias,
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
        this.props.history.push("/admin/categories");
    };

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
                                <h1 className="display-4">Редактировать категорию</h1>
                            </div>
                            <div className="col-md-4 align-self-center">
                                <Link to="/admin/categories" type="button" className="btn btn-warning btn-block"
                                      role="button">
                                    Вернуться назад
                                </Link>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <form>
                                    <div className="form-group">
                                        <label>Название категории</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={this.state.name}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Алиас категории</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="alias"
                                            value={this.state.alias}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Описание категории</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="3"
                                            value={this.state.description}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className={this.state.button ?
                                            "btn btn-primary"
                                            :
                                            "btn btn-primary disabled"
                                        }
                                        onClick={(e) => {this.handleSubmit(e)}}
                                    >Редактировать</button>
                                </form>
                            </div>
                    </div>

                    <div className="modal fade" id="successModal" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Категория успешно отредактирована</h5>
                                </div>
                                <div className="modal-footer">
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

                </div>}
            </main>
        );
    }
}

export default withRouter(EditCategory);
import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';


class EditPhone extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            model: "",
            button: true,
            load: true
        }
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.name && this.state.model) {
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
        const url = `/api/admin/phones/${this.props.match.params.phoneId}`;

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
                model: data.model,
                load: false
            })
        });
    }

    saveData() {
        let settings = {
            url: `/api/admin/phones/${this.props.match.params.phoneId}`,
            "async": true,
            "crossDomain": true,
            "method": "PUT",
            "headers": {
                token: this.props.token
            },
            "data": {
                name: this.state.name,
                model: this.state.model
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
        this.props.history.push("/admin/phones");
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
                                <h1 className="display-4">Редактировать телефон</h1>
                            </div>
                            <div className="col-md-4 align-self-center">
                                <Link to="/admin/phones" type="button" className="btn btn-warning btn-block"
                                      role="button">
                                    Вернуться назад
                                </Link>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <form>
                                    <div className="form-group">
                                        <label>Марка телефона</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={this.state.name}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Модель телефона</label>
                                        <textarea
                                            className="form-control"
                                            name="model"
                                            rows="3"
                                            value={this.state.model}
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
                                        <h5 className="modal-title">Телефон успешно отредактирован</h5>
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

export default withRouter(EditPhone);
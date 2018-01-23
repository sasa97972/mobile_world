import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class EditUser extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            role: "",
            button: false,
            load: true,
            user_id: this.props.match.params.user_id
        };

        this.getInitialData = this.getInitialData.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.name && this.state.email) {
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
            url: `/api/admin/users/${this.state.user_id}`,
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
                name: data.name,
                email: data.email,
                role: data.role
            });
        });
    }

    saveData() {
        let settings = {
            url: `/api/admin/users/${this.state.user_id}`,
            "method": "PUT",
            "async": true,
            "crossDomain": true,
            "headers": {
                token: this.props.token,
            },
            "data": {
                name: this.state.name,
                email: this.state.email,
                role: this.state.role,
            }
        };

        return axios(settings).then(response => {
            return response.statusText === "Updated";
        });
    }

    handleBack() {
        $("#successModal").modal('hide');
        this.props.history.push("/admin/users");
    };

    handleChangeSelect(event) {
        this.setState({
            [event.target.name]: event.target.options[event.target.selectedIndex].value,
            button: true
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
                                <Link to="/admin/users" type="button" className="btn btn-warning btn-block" role="button">
                                    Вернуться назад
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form>

                                    <div className="form-group">
                                        <label>Имя пользователя</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={this.state.name}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email пользователя</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label >Роль пользователя</label>
                                        <select
                                            className="custom-select"
                                            name="role"
                                            onChange={(e) => {this.handleChangeSelect(e)}}
                                            value={this.state.role}
                                        >
                                            <option value="user">Пользователь</option>
                                            <option value="admin">Администратор</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className={this.state.button ?
                                            "btn btn-primary"
                                            :
                                            "btn btn-primary disabled"
                                        }
                                        onClick={(e) => {this.handleSubmit(e)}}
                                    >
                                        Редактировать
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>}

                <div className="modal fade" id="successModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Пользователь успешно отредактирован</h5>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => this.handleBack()}
                                >
                                    Вернуться к пользователям
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        );
    }
}

export default withRouter(EditUser);
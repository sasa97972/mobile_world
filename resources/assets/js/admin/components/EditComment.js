import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';


class EditComment extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            comment: "",
            button: false,
            load: true
        }
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.text) {
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
        const url = `/api/admin/comments/${this.props.match.params.commentId}`;

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
                text: data.comment,
                comment: data,
                load: false
            })
        });
    }

    saveData() {
        let settings = {
            url: `/api/admin/comments/${this.props.match.params.commentId}`,
            "async": true,
            "crossDomain": true,
            "method": "PUT",
            "headers": {
                token: this.props.token
            },
            "data": {
                text: this.state.text,
            }
        };

        const success = axios(settings).then(response =>  {
            return response.statusText === "Updated"
        });

        return !!success;
    }

    handleBack() {
        $("#successModal").modal('hide');
        this.props.history.goBack();
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
                                <h1 className="display-4">Редактировать комментарий</h1>
                            </div>
                            <div className="col-md-4 align-self-center">
                                <button
                                    type="button"
                                    className="btn btn-warning btn-block"
                                    role="button"
                                    onClick={() => {this.handleBack()}}
                                >
                                    Вернуться назад
                                </button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 comment__info">
                                <CommentInfo comment={this.state.comment}/>
                            </div>
                            <div className="col-md-12">
                                <form className="edit__form">
                                    <div className="form-group">
                                        <label>Описание категории</label>
                                        <textarea
                                            className="form-control"
                                            name="text"
                                            rows="3"
                                            value={this.state.text}
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
                                        <h5 className="modal-title">Комментарий успешно отредактирован</h5>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => this.handleBack()}
                                        >
                                            Вернуться к комментариям
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

function CommentInfo(props) {
    const {comment} = props;
    return(
        <ul className="list-group">
            <li className="list-group-item">Имя пользователя: {comment.user.name}</li>
            <li className="list-group-item">Email пользователя: {comment.user.email}</li>
            <li className="list-group-item">Продукт: {comment.product.title}</li>
        </ul>
    );
}

export default withRouter(EditComment);
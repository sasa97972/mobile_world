import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            info: null,
            comments: null
        }
    }

    componentDidMount() {
        const url = "/api/admin";
        let settings = {
            "async": true,
            "crossDomain": true,
            "method": "GET",
            "headers": {
                token: this.props.token
            }
        };

        const self = this;
        fetch(url, settings)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function(data) {
                    self.setState({info: data.info, comments: data.comments, load: false})
                });
            })
            .catch(function (error) {
                console.log('Request failed', error);
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
                            {this.state.info.map((item, index)=>{
                                return(
                                    <InfoBlock
                                        key={index}
                                        name={item.name}
                                        count={item.count}
                                    />
                                );
                            })}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h2>5 последних комментариев:</h2>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Имя пользователя</th>
                                            <th>Продукт</th>
                                            <th>Комментарий</th>
                                            <th className="dashboard__table-actions">Действие</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.comments.map((comment, index)=>{
                                            return(
                                                <CommentBlock
                                                    key={index}
                                                    id={comment.id}
                                                    user={comment.user}
                                                    product={comment.product}
                                                    comment={comment.comment}
                                                />
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </main>
        );
    }
};

const InfoBlock = (props) => {
    const {name, count} = props;
    return(
        <div className="col-md-4">
            <div className="jumbotron">
                <h1 className="display-5">{name}</h1>
                <p className="lead">Количество: <span className="badge badge-primary">{count}</span></p>
            </div>
        </div>
    )
};

const CommentBlock = (props) => {
    const {user, comment, product, id} = props;
    return(
        <tr>
            <td>{id}</td>
            <td>{user.name}</td>
            <td>{product.title}</td>
            <td>{comment}</td>
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
                    <button type="button" className="btn btn-secondary">Удалить</button>
                </div>
            </td>
        </tr>
    );
};

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class CreateCategory extends Component
{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3 dash__main">
                <div className="row">
                    <div className="col-md-8">
                    <h1 className="display-4">Добавить новую категорию</h1>
                </div>
                    <div className="col-md-4 align-self-center">
                        <Link to="/admin/categories" type="button" className="btn btn-warning btn-block" role="button">
                            Вернуться назад
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}
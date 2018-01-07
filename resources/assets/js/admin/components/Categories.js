import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Categories extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            categories: null
        }
    }

    componentDidMount() {
        const url = "http://localhost/api/admin/categories";
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
                    console.log(data);
                    self.setState({categories: data, load: false})
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
                            <div className="col-md-12">
                                <h1 className="display-4">Категории</h1>
                            </div>
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-striped table-dark table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Название</th>
                                            <th scope="col">Описание</th>
                                            <th scope="col" className="dashboard__table-actions">Действия</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.categories.map((category) => (
                                                <CategoryBlock

                                                />
                                            ))}
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
}

const CategoryBlock = (props) => {
    const {id, name, description} = props;
    return(
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
    );
};

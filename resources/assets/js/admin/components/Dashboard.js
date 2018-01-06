import React, { Component } from 'react';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            info: null
        }
    }

    componentDidMount() {
        const url = "http://localhost/api/admin/info";
        let settings = {
            "async": true,
            "crossDomain": true,
            "method": "GET",
            "headers": {
                token: "verySecretToken"
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
                    self.setState({info: data, load: false})
                });
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    render() {
        return (
            <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
                {this.state.load ?
                    <h1>Loading...</h1>
                :
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
                <h1 className="display-4">{name}</h1>
                <p className="lead">Количество: <span className="text-success">{count}</span></p>
            </div>
        </div>
    )
};

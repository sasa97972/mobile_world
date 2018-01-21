import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class AddImages extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            images: [],
            product_id: this.props.match.params.product_id,
            image_loading: false
        };

        this.getImages = this.getImages.bind(this);
    }

    componentDidMount() {
        this.getImages();
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        let data = new FormData();
        data.append("image", file);
        data.append('product_id', this.state.product_id);

        let settings = {
            url: "/api/admin/images",
            "async": true,
            "crossDomain": true,
            "method": "post",
            "headers": {
                token: this.props.token
            },
            "data": data,
        };

        this.setState({image_loading: true});
        const success = axios(settings).then(response =>  {
            this.getImages();
        });

    }

    getImages() {
        let settings = {
            url: `/api/admin/images?product_id=${this.state.product_id}`,
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
                images: data,
                image_loading: false
            });
        });
    }

    handleDelete(id) {
        if(!confirm("Вы действительно хотите удалить изображение ?")) {
            return;
        }

        let settings = {
            url: `/api/admin/images/${id}`,
            "async": true,
            "crossDomain": true,
            "method": "DELETE",
            "headers": {
                token: this.props.token
            },
        };

        const success = axios(settings).then(response =>  {
            this.getImages();
        });
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
                            <div className="col-md-6">
                                <h1 className="display-4">Добавить изображения</h1>
                            </div>
                            <div className="col-md-3 align-self-center">
                                <Link to="/admin/products" type="button" className="btn btn-warning btn-block" role="button">
                                    Вернуться к товарам
                                </Link>
                            </div>
                            <div className="col-md-3 align-self-center">
                                <Link to={`/admin/products/edit/${this.state.product_id}`} type="button" className="btn btn-primary btn-block" role="button">
                                    Вернуться к редактированию товара
                                </Link>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Загрузить изображения</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    name="image"
                                    onChange={(e) => {this.handleFileUpload(e)}}
                                />
                                <label className="custom-file-label">
                                    {this.state.image_loading ?
                                        <img className="input_load-image" src="https://idt.taxmann.com/images/loading.gif" alt="Loading"/>
                                        :
                                        "Выберите изображение"
                                    }

                                </label>
                            </div>
                        </div>
                        <h4 className="section-heading">Загруженные изображения:</h4>
                        <div className="gallery row">
                            {this.state.images.length ?
                                this.state.images.map((image) => (
                                    <div className="col-md-4 gallery__col" key={image.id}>
                                        <button
                                            type="button"
                                            className="gallery__delete"
                                            aria-label="Delete image"
                                            onClick={this.handleDelete.bind(this, image.id)}
                                        >
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <img
                                            src={image.path}
                                            className="responsive-image"
                                        />
                                    </div>
                                ))
                            :
                                ""
                            }
                        </div>
                    </div>}
            </main>
        )
    }
}

export default withRouter(AddImages);
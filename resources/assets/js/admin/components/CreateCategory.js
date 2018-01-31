import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';


class CreateCategory extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            alias: "",
            image: null,
            imagePreviewUrl: "",
            button: false
        };

        this.checkValid = this.checkValid.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value}, this.checkValid())
    }

    checkValid() {
        if(this.state.description && this.state.name && this.state.alias && this.state.image) {
            this.setState({button: true});
        } else {
            this.setState({button: false});
        }
    }

    saveData() {
        const data = new FormData();
        data.append("image", this.state.image);
        data.append("name", this.state.name);
        data.append("description", this.state.description);
        data.append("alias", this.state.alias);

        let settings = {
            url: "/api/admin/categories",
            "async": true,
            "crossDomain": true,
            "method": "post",
            "headers": {
                token: this.props.token
            },
            "data": data
        };

        const success = axios(settings).then(response =>  {
            if(response.statusText === "Created") {
                return true;
            }
        });

        return !!success;
    }

    handleMore() {
        this.setState({name: "", description: ""});
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

    handleFileUpload(event) {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                image: file,
                imagePreviewUrl: reader.result
            }, this.checkValid());
        };

        reader.readAsDataURL(file)
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
                            <div className="form-group">
                                <label>Титульное изображение</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        name="title_image"
                                        onChange={(e) => {this.handleFileUpload(e)}}
                                    />
                                    <label className="custom-file-label">
                                        {this.state.image ? "Изображение добавлено!" : "Выберите изображение"}
                                    </label>
                                </div>
                                {this.state.image &&
                                <div className="preview-image-container">
                                    <img src={this.state.imagePreviewUrl}/>
                                </div>
                                }
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

export default withRouter(CreateCategory);
import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class CreateProduct extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category_id: 1,
            phones_selected: [],
            price: 0,
            image: null,
            imagePreviewUrl: "",
            button: false,
            categories: null,
            phones: null,
            load: true,
            product_id: null
        };

        this.getInitialData = this.getInitialData.bind(this);
        this.handleChangeMultiSelect = this.handleChangeMultiSelect.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value}, () => {
            if(this.state.description && this.state.title) {
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
            url: "/api/admin/products/create",
            "async": true,
            "crossDomain": true,
            "method": "get",
            "headers": {
                token: this.props.token
            },
        };

        const success = axios(settings).then(response =>  {
            const data = response.data;
            let phones = [];
            data.phones.map((phone) => {
               phones.push({value: phone.id, label: `${phone.name} ${phone.model}`})
            });
            this.setState({
                load: false,
                categories: data.categories,
                phones: phones
            });
        });
    }

    saveData() {
        const data = new FormData();
        data.append("image", this.state.image);
        data.append("title", this.state.title);
        data.append("description", this.state.description);
        data.append("price", `${this.state.price}`);
        data.append("category_id", `${this.state.category_id}`);
        data.append("phones_id", `${this.state.phones_selected}`);

        let settings = {
            url: "/api/admin/products",
            "method": "post",
            "async": true,
            "crossDomain": true,
            "headers": {
                token: this.props.token,
            },
            "data": data
        };

        const success = axios(settings).then(response =>  {
            this.setState({product_id: response.data});
            return response.statusText === "Created";
        });

        return !!success;
    }

    handleBack() {
        $("#successModal").modal('hide');
        this.props.history.push("/admin/products");
    };

    handleMore(){
        this.setState({
            title: "",
            description: "",
            category_id: 1,
            phone_id: 1,
            price: 0,
            image: null,
            imagePreviewUrl: ""
        });
        $("#successModal").modal('hide');
    }

    handleMoreImages() {
        $("#successModal").modal('hide');
        this.props.history.push(`/admin/product/images/${this.state.product_id}`);
    }

    handleChangeSelect(event) {
        this.setState({
            [event.target.name]: event.target.options[event.target.selectedIndex].value
        });
    }

    handleChangeMultiSelect(selectedOptions) {
       this.setState({
           phones_selected: selectedOptions
       });
    }

    handleFileUpload(event) {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                image: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
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
                                <Link to="/admin/products" type="button" className="btn btn-warning btn-block" role="button">
                                    Вернуться назад
                                </Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form id="upload-image" encType="multipart/form-data">

                                    <div className="form-group">
                                        <label>Название товара</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={this.state.title}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Описание товара</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="3"
                                            value={this.state.description}
                                            onChange={(e) => {this.handleInput(e)}}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label >Выберите категорию</label>
                                        <select
                                            className="custom-select"
                                            name="category_id"
                                            onChange={(e) => {this.handleChangeSelect(e)}}
                                            value={this.state.category_id}
                                        >
                                            {this.state.categories.map((category) => (
                                                <option value={category.id} key={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label >Выберите телефоны</label>
                                        <Select
                                            name="form-field-name"
                                            value={this.state.phones_selected}
                                            multi={true}
                                            onChange={this.handleChangeMultiSelect}
                                            options={this.state.phones}
                                            simpleValue={true}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Цена товара (в Грн)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={this.state.price}
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
                    </div>}

                <div className="modal fade" id="successModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Товар успешно создан</h5>
                            </div>
                            <div className="modal-footer">
                                <div className="btn-group" role="group">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {this.handleMoreImages()}}
                                    >Добавить дополнительные изображения для созданого товара</button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={() => {this.handleMore()}}
                                    >Добавить ещё товар</button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => this.handleBack()}
                                    >
                                        Вернуться к товарам
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        );
    }
}

export default withRouter(CreateProduct);
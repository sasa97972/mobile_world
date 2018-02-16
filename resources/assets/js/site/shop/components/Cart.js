import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getProducts, addProduct} from '../actions/cart';

class Cart extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            confirm: false,
            phone_number: "",
            complete: false,
            button: false
        };

        this.addProduct = this.addProduct.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.changeNumber = this.changeNumber.bind(this);
        this.completeOrder = this.completeOrder.bind(this);
        this.continueShop = this.continueShop.bind(this);
    }

    addProduct(id) {
        this.props.addProduct({url: "/cart", product_id: id}).then(() => {$(".cart__modal").fadeIn(500)});
    }

    deleteProduct(id) {
        let settings = {
            url: `/cart/${id}`,
            "async": true,
            "crossDomain": true,
            "method": "DELETE",
        };

        const success = axios(settings).then(response =>  {
            this.getProducts();
        });
    }

    componentWillMount() {
        this.props.getProducts()//.then(() => {$(".cart__modal").fadeIn(500)});
    }

    continueShop() {
        this.setState({complete: false});
        $(".cart__modal").fadeOut(500);
    }

    confirmOrder() {
        this.setState({confirm: !this.state.confirm});
    }

    changeNumber(event) {
        const value = event.target.value;
        if(value.search(/[^0-9\-\s+]/igm) !== -1) {
            alert("В телефоне могут содержаться только цифры!");
            return false;
        } else if(this.state.phone_number.length < 10) {
            this.setState({button: false});
        } else {
            this.setState({button: true});
        }
        this.setState({phone_number: value});
    }

    completeOrder() {
        if(this.state.phone_number.length < 10) {
            alert("Введите коректный телефон!");
            return false;
        }

        let settings = {
            url: "/order",
            async: true,
            crossDomain: true,
            method: "POST",
            data: {
                phone_number: this.state.phone_number,
            }
        };

        const success = axios(settings).then(response =>  {
            this.setState({phone_number: "", confirm: false, products: [], complete: true});
        });
    }

    render() {
        const {phone_number, confirm, complete, button} = this.state;
        const {products} = this.props;
        return(
            <CartView
                products={products}
                continueShop={this.continueShop}
                deleteProduct={this.deleteProduct}
                confirm={confirm}
                confirmOrder={this.confirmOrder}
                number={phone_number}
                changeNumber={this.changeNumber}
                completeOrder={this.completeOrder}
                complete={complete}
                button={button}
            />
        );
    }
}

const CartView = (props) => {
    const {products, continueShop, deleteProduct, confirm, changeNumber, number, confirmOrder, completeOrder,
    complete, button} = props;
    let totalPrice = 0;
    products.map((product)=>{
        totalPrice += product.price;
    });
    return(
        <MuiThemeProvider>
            <div className="cart__modal">
                <div className="cart">
                    {!confirm ?
                        <div className="cart__content">
                            {complete ?
                                <h4 style={{marginBottom: "20px"}}>Спасибо за заказ, наш оператор скоро свяжется с вами!</h4>
                                :
                                <ul className="cart__list">
                                    {products.length ? products.map((product) => (
                                        <li key={product.id} className="cart__item">
                                            <div className="cart__img-container">
                                                <img
                                                    className="cart__img"
                                                    src={product.title_image}
                                                    alt={product.title}
                                                />
                                            </div>
                                            <p className="cart__name">{product.title}</p>
                                            <p className="cart__name">Цена: {product.price} Грн</p>
                                            <i
                                                className="fas fa-times cart__content-delete"
                                                onClick={deleteProduct.bind(null, product.id)}
                                            />
                                        </li>
                                    )) : <li style={{marginBottom: "20px"}}>Вы ещё ничего не добавили в корзину</li>}
                                </ul>
                            }
                            {totalPrice ? <p>Сумарная стоимость заказа: {totalPrice} Грн</p> : ""}
                            <div className="cart__buttons">
                                <RaisedButton
                                    label="Оформить заказ"
                                    secondary={true}
                                    disabled={!products.length}
                                    style={{marginRight: "20px"}}
                                    onClick={confirmOrder}
                                />
                                <RaisedButton
                                    label="Продолжить покупки"
                                    primary={true}
                                    onClick={continueShop}
                                />
                            </div>
                        </div>
                    :
                        <div className="cart__content">
                            <TextField
                                onChange={changeNumber}
                                floatingLabelText="Введите ваш номер телефона"
                                value={number}
                                fullWidth={true}
                            />
                            <RaisedButton
                                label="Подтвердить заказ"
                                secondary={true}
                                onClick={completeOrder}
                                style={{marginRight: "20px"}}
                                disabled={!button}
                            />
                            <RaisedButton
                                label="Вернуться назад"
                                primary={true}
                                onClick={confirmOrder}
                            />
                        </div>
                    }
                </div>
            </div>
        </MuiThemeProvider>
    );
};



const mapStateToProps = state => ({
    products: state.cart.products,
    total_price: state.cart.total_price
});

const mapDispatchToProps = dispatch => ({
    getProducts: (params) => {
        return dispatch(getProducts(params));
    },
    addProduct: (params) => {
        return dispatch(addProduct(params));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Cart));
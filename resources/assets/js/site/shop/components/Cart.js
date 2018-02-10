import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

export const Cart = (props) => {
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
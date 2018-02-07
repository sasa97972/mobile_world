import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export const ProductView = (props) => {
    const {product} = props;
    return(
        <div>
            {product && <div>
                <h1>{product.title}</h1>
                <p>Цена: {product.price} Грн</p>
                <p>{product.description}</p>
                <p>Товар подходит для:</p>
                <ul>
                    {product.phones.length ? product.phones.map((phone) => (
                        <li>{phone.name} {phone.model};</li>
                    )) :
                        <li>Для всех телефонов</li>
                    }
                </ul>
                <RaisedButton label="Купить" secondary={true} />
            </div>}
        </div>
    );
};
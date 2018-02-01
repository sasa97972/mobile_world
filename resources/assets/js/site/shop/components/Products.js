import React, {Component} from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {Search} from './Search';

export const Products = (props) => {
    const {products, search, productSearch} = props;

    return(
        <main className="col-md-9">
            <div className="row">
                <div className="col-md-12">
                    <Search productSearch={productSearch}  />
                </div>
            </div>
            <div className="row">
                {products && products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </main>
    );
};

const ProductCard = (props) => {
    const {product} = props;

    const cardStyle = {
        height: "100%",
    };

    return(
        <div className="col-md-6 col-xl-4 card-custom">
            <Card style={cardStyle} className="custom-card__card">
                <CardMedia>
                    <img src={product.title_image} alt="Продукция" />
                </CardMedia>
                <CardTitle title={product.title} subtitle={`Цена: ${product.price} Грн`} />
                <CardText>
                    {product.description}
                </CardText>
                <CardActions style={{marginTop: "auto"}}>
                    <RaisedButton
                        href={`/shop/product/${product.id}`}
                        label="Подробнее"
                        primary={true} />
                    <RaisedButton label="В корзину" secondary={true} />
                </CardActions>
            </Card>
        </div>
    );
};
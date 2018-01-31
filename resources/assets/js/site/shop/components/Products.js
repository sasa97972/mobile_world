import React, {Component} from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export const Products = (props) => {
    const {products} = props;

    const cardStyle = {
        height: "100%",
    };

    return(
        <main className="col-md-9">
            <div className="row">
                {products && products.map((product) => (
                    <div className="col-md-6 col-xl-4 card-custom" key={product.id}>
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
                ))}
            </div>
        </main>
    );
};
import React, {Component} from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {Search} from './Search';
import {Pagination} from './Pagination';
import {SortBar} from './SortBar';

export const Products = (props) => {
    const {
        products,
        search,
        productSearch,
        currentPage,
        pages,
        changePage,
        changeSort,
        changeSortBy,
        sortBy,
        sort,
        changePerPage,
        perPage} = props;

    return(
        <main className="col-md-9 products">
            <div className="row">
                <Search
                    productSearch={productSearch}
                    search={search}
                />
            </div>
            <div className="row">
                <SortBar
                    changeSort={changeSort}
                    sort={sort}
                    changeSortBy={changeSortBy}
                    sortBy={sortBy}
                    perPage={perPage}
                    changePerPage={changePerPage}
                />
            </div>
            <div className="row">
                {products && products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            <Pagination
                pages={pages}
                currentPage={currentPage}
                changePage={changePage}
            />
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
                    <RaisedButton label="Купить" secondary={true} />
                </CardActions>
            </Card>
        </div>
    );
};
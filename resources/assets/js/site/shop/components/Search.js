import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export const Search = (props) => {
    const {productSearch, search} = props;
    return(
        <div className="col-md-12 search">
            <TextField
                onChange={productSearch}
                floatingLabelText="Поиск товара"
                value={search}
                fullWidth={true}
            />
        </div>
    );
};
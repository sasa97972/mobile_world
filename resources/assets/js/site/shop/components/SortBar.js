import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const itemsSortBy = [
    <MenuItem key={1} value="created_at" primaryText="Дате добавления" />,
    <MenuItem key={2} value="title" primaryText="Названию"  />,
    <MenuItem key={3} value="model" primaryText="Марке телефона" />,
    <MenuItem key={4} value="name" primaryText="Категории" />,
];

const itemsSort = [
    <MenuItem key={1} value="asc" primaryText="По возрастанию" />,
    <MenuItem key={2} value="desc" primaryText="По убыванию"  />,
];

const itemsPerPage = [
    <MenuItem key={1} value="10" primaryText="10" />,
    <MenuItem key={2} value="20" primaryText="20"  />,
    <MenuItem key={3} value="30" primaryText="30"  />,
];

const styles = {
    marginRight: "40px"
};

export const SortBar = (props) => {
    const {changeSort, sort, changeSortBy, sortBy, perPage, changePerPage} = props;
    return(
        <div className="col-md-12 search">
            <SelectField
                value={sortBy}
                onChange={changeSortBy}
                floatingLabelText="Сортировать по:"
                style={styles}
            >
                {itemsSortBy}
            </SelectField>
            <SelectField
                value={sort}
                onChange={changeSort}
                floatingLabelText="Сортировать:"
                style={styles}
            >
                {itemsSort}
            </SelectField>
            <SelectField
                value={perPage}
                onChange={changePerPage}
                floatingLabelText="Кол-во товаров на странице:"
            >
                {itemsPerPage}
            </SelectField>
        </div>
    );
};
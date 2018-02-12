import React, {Component} from 'react';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export const SideBar = (props) => {
    const {filter, checkCategories, checkPhones, price, changePrice} = props;
    return(
        <aside className="col-md-3">
            <List>
                <Subheader>Фильтр для товаров</Subheader>
                <ListItem
                    primaryText="Категории"
                />
                <div className="row">
                    {filter.length && filter[0].categories.length && filter[0].categories.map((category, index) => (
                        <div className="col-md-6 filter__item" key={index}>
                            <Checkbox
                                label={category.name}
                                checked={category.check}
                                onCheck={checkCategories.bind(null, category.name)}
                            />
                        </div>
                    ))}
                </div>
                <br/><Divider/>
                <ListItem
                    primaryText="Телефоны"
                />
                <div className="row">
                    {filter.length && filter[1].phones.length &&
                        <div className="col-md-12 filter__item">
                            <Select
                                name="phones"
                                value={filter[1].phonesSelected}
                                multi={true}
                                onChange={checkPhones}
                                options={filter[1].phonesSelect}
                                simpleValue={true}
                            />
                        </div>
                    }
                </div>
                <br/><Divider/>
                <ListItem
                    primaryText="Цена"
                />
                <div className="row">
                    {filter.length && filter[2].price &&
                    <div className="col-md-12 filter__item filter__item_range">
                        <InputRange
                            maxValue={price.max}
                            minValue={price.min}
                            value={filter[2].price}
                            formatLabel={value => `${value} Грн`}
                            onChange={value => changePrice(value)} />
                    </div>
                    }
                </div>
            </List>
        </aside>
    );
};
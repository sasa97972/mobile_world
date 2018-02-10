import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export const Pagination = (props) => {
    const {currentPage, pages, changePage} = props;
    return(
        <div className="row">
            <div className="col-md-12 pagination__row">
                {currentPage - 1 > 0 &&
                <RaisedButton
                    label="<<"
                    onClick={() => changePage(currentPage - 1)}
                />}
                {pages > 1 &&
                <RaisedButton
                    label={currentPage}
                    secondary={true}
                />}
                {currentPage + 1 <= pages &&
                <RaisedButton
                    label=">>"
                    onClick={() => changePage(currentPage + 1)}
                />}
            </div>
        </div>
    );
};
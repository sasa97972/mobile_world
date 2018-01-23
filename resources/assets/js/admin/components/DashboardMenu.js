import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withRouter, browserHistory} from "react-router";

const links = [
    {
        id: 1,
        name: 'Обзор',
        link: '/admin'
    },
    {
        id: 2,
        name: 'Категории',
        link: '/admin/categories'
    },
    {
        id: 8,
        name: 'Телефоны',
        link: '/admin/phones'
    },
    {
        id: 3,
        name: 'Продукты',
        link: '/admin/products',
        relative: '/admin/images'
    },
    {
        id: 5,
        name: 'Комментарии',
        link: '/admin/comments'
    },
    {
        id: 6,
        name: 'Пользователи',
        link: '/admin/users'
    },
    {
        id: 7,
        name: 'Заказы',
        link: '/admin/orders'
    }
];

class DashboardMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeId: 1,
        }
    }

    componentDidMount() {
        const index = DashboardMenu.find(links, this.props.location.pathname);
        this.setState({activeId: index});
        this.props.history.listen(location => {
            const index = DashboardMenu.find(links, location.pathname);
            this.setState({activeId: index});
        })
    }



    static find(array, value) {
        for(let i = 1; i < array.length; i++) {
            if(
                value.search(array[i].link) !== -1 ||
                (array[i].relative && value.search(array[i].relative) !== -1 )
            )
                return array[i].id
        }

        return 1;
    }

    handleClick(e, id) {
        this.setState({activeId: id});
    }

    render() {
        return (
            <nav className="col-sm-3 col-md-2 col-xs-12 bg-light sidebar">
                <ul className="nav nav-pills flex-column dash__menu-list">
                    {links.map((item) => {
                        return(
                            <DashboardLink
                                isActive={item.id === this.state.activeId}
                                key={item.id}
                                name={item.name}
                                link={item.link}
                                onClick={(e)=>{this.handleClick(e, item.id)}}
                            />
                        )
                    })}
                </ul>
            </nav>
        );
    }
}

const DashboardLink = (props) => {
    const {isActive, link, name, onClick} = props;
    return(
      <li className='nav-item'>
          <Link
              to={link}
              className={isActive ? 'nav-link active' : 'nav-link'}
              onClick={onClick}>
              {name}
          </Link>
      </li>
    );
};

export default withRouter(DashboardMenu)
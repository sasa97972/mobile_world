import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Clear from 'material-ui/svg-icons/content/clear';
import {Pagination} from './Pagination';

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const commentStyle = {
        marginTop: "10px",
    },
    tabsStyle = {
        marginTop: "10px",
    },
    paperStyle = {
        padding: "15px"
    },
    iconButtonElement = (
        <IconButton
            touch={true}
            tooltip="Действия"
            tooltipPosition="bottom-left"
        >
            <MoreVertIcon color={grey400} />
        </IconButton>
    ),
    rightIconMenu = (parent, id, user, appUser, deleteComment) => (
        <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onClick={parent.bind(null, id, user.name)}>Ответить</MenuItem>
            {user.id === appUser.id && <MenuItem onClick={deleteComment.bind(null, id)}>Удалить</MenuItem>}
        </IconMenu>
    );


function buildChildren(comment, parent, appUser, deleteComment, depth = 5) {
    return comment.children.map((comment) => {
        return (
            <div key={comment.id}>
                <div style={{marginLeft: `${10 + depth}px`}}>
                    <ListItem
                        key={comment.id}
                        rightIconButton={rightIconMenu(parent, comment.id, comment.user, appUser, deleteComment)}
                        primaryText={comment.user.name}
                        secondaryText={<p>{comment.comment}</p>}
                    />
                </div>
                {comment.children.length ? buildChildren(comment, parent, appUser, deleteComment, depth + 20) : ""}
            </div>
        )
    });
}

export const Comments = (props) => {
    const {comments, comment, handleInput, createComment, parentComment, button, parent_name, discardReply,
        deleteComment, appUser, pages, currentPage, changePage} = props;
    return(
        <Tabs style={tabsStyle}>
            <Tab label="Комментарии" >
                <Paper zDepth={1} style={paperStyle}>
                    <List>
                        {comments && comments.length ? comments.map((comment) => (
                            <div key={comment.id}>
                                <ListItem
                                    key={comment.id}
                                    rightIconButton={rightIconMenu(parentComment, comment.id, comment.user, appUser, deleteComment)}
                                    primaryText={comment.user.name}
                                    secondaryText={<p>{comment.comment}</p>}
                                />
                                {comment.children.length ? buildChildren(comment, parentComment, appUser, deleteComment) : ""}
                                <Divider/>
                            </div>
                        )) : <ListItem
                                primaryText="Здесь ещё нет комментариев :("
                            />}
                        {parent_name && <ListItem
                            key={comment.id}
                            rightIconButton={<IconButton tooltip="Убрать" onClick={discardReply}>
                                                <Clear color={grey400} />
                                            </IconButton>
                            }
                            primaryText={` Ответ на комментарий пользователя ${parent_name}`}
                        />}
                    </List>
                    <Pagination
                        pages={pages}
                        currentPage={currentPage}
                        changePage={changePage}
                    />
                    {appUser ?
                        <div>
                            <TextField
                                floatingLabelText="Оставить комментарий"
                                multiLine={true}
                                fullWidth={true}
                                rows={1}
                                value={comment}
                                onChange={handleInput}
                            />
                            <RaisedButton
                                label="Отправить"
                                primary={true}
                                onClick={createComment}
                                disabled={!button}
                            />
                        </div>
                    :
                        <p style={{marginTop: "20px"}}>
                            <a href="/login">Авторизируйтесь</a> или <a href="/register">зарегистрируйтесь</a>,
                            чтобы оставлять комментарии
                        </p>}
                </Paper>
            </Tab>
        </Tabs>
    );
};
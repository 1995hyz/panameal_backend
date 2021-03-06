import React from 'react';
import {Button, Typography, withStyles} from "@material-ui/core";
import {orange} from '@material-ui/core/colors';
import url from '../../modules/url';
import LayoutBody from "../components/LayoutBody";
import Paper from "../components/Paper";
import FeedTile from '../components/FeedTile';
import FormButton from "../form/FormButton";

const styles = theme => ({
    card: {
        marginTop: '2.5vh',
        marginBottom: '2.5vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '50vw',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        backgroundColor: orange[500],
    },
    root: {
        display: 'flex',
        backgroundRepeat: 'no-repeat',
    },
    paper: {
        padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`,
        [theme.breakpoints.up('md')]: {
            padding: `${theme.spacing.unit * 10}px ${theme.spacing.unit * 8}px`,
        },
        marginTop: '-10vh',
    },
    username: {
        fontSize: 15,
    },
    title: {
        variant: 'h6',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '5vh',
        marginTop: '-8vh',
        fontSize: 34,
    },
});
var ctr = 0;

class FeedData extends React.Component {
    state = {
        data: [],
        ctr: 0,
    };
    getPost = () => {
        console.log(ctr);
        fetch(url + '/view_post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('authToken'),
                begin: ctr,
                amount: 6,
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(myJson =>{
                console.log(myJson);
                this.setState({data: myJson});
            });
    };

    componentWillMount() {
        this.getPost();
    }

    handleGetMore = () => {
        ctr = ctr + 1;
        this.getPost();
    };

    handleLike = index => {
        console.log(index);
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <LayoutBody margin marginBottom width="medium">
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h6" color="inherit">
                            Feed
                        </Typography>
                        {this.state.data.map((item, index) =>(
                            <FeedTile
                                className={classes}
                                username={item.username}
                                content={item.post.content}
                                postTime={item.post.post_time}
                                postID={item.post.post_id}
                                handleLikeButton={this.handleLike}
                                key={index+3000}
                            />
                            
                            /*<Card className={classes.card} key={index}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" className={classes.avatar}>
                                            {item.username.charAt(0)}
                                        </Avatar>
                                    }
                                    title={item.username}
                                    subheader={item.post.post_time}
                                />
                                <CardContent>
                                    <Typography component="p">
                                        {item.post.content}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.actions} disableActionSpacing>
                                    <IconButton aria-label="Like" onClick={()=>this.handleLike(index)}>
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="Share">
                                        <ShareIcon/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                            )*/
                        ))}
                    </Paper>
                    <FormButton
                        className={classes.button}
                        size="large"
                        color="secondary"
                        fullWidth
                        component={Button}
                        onClick={this.handleGetMore}
                    >
                        Get More Posts
                    </FormButton>
                </LayoutBody>
            </div>
        )
    }
}


export default withStyles(styles)(FeedData);
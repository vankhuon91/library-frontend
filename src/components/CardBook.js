import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

export default function CardBook(props) {
  const classes = useStyles();
 const {title,description,coverUrl,id}=props
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={coverUrl}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
        <Button size="small" color="primary">
          Add to card
        </Button>
        <Button size="small" color="primary">
          Update
          <Link to='/u'>ddd</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
CardBook.defaultProps ={
    coverUrl:'https://i.harperapps.com/covers/9780062951366/x510.jpg',
    title:'Name of book',
    description:'loremLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
}
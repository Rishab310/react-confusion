import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

// FOR CREATING A NEW COMMENT
export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
});

// FOR LOADING THE DISHES
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));
  return fetch(baseUrl + 'dishes')
    .then(res => res.json())
    .then(dishes => dispatch(addDishes(dishes)));
  // setTimeout(() => {
  //   dispatch(addDishes(DISHES));
  // },2000)
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});


// FOR LOADING THE COMMENTS
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(res => res.json())
    .then(comments => dispatch(addComments(comments)));
}
export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});



// FOR LOADING THE PROMOS
export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + 'promotions')
    .then(res => res.json())
    .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});


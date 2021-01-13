import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle heading>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else {
        return (
            <div></div>
        );
    }
};
function RenderComments({dish}) {
    if (dish != null && dish.comments != null) {
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {
                        dish.comments.map((comm) => {
                            return (
                                <li>
                                    <div>{comm.comment}</div>
                                    <br />
                                    <div>--{comm.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comm.date)))}</div>
                                    <br />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
};
function DishDetail(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish ={props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish = {props.dish}/>
                </div>
            </div>
        </div>
    );
}


export default DishDetail;



// Before Changing to functional components

// class DishDetail extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }

//     renderDish(dish) {
//         if (dish != null) {
//             return (
//                 <Card>
//                     <CardImg width="100%" object src={dish.image} alt={dish.name} />
//                     <CardBody>
//                         <CardTitle heading>{dish.name}</CardTitle>
//                         <CardText>{dish.description}</CardText>
//                     </CardBody>
//                 </Card>
//             );
//         }
//         else {
//             return (
//                 <div></div>
//             );
//         }
//     };

//     renderComments(dish) {
//         if (dish != null && dish.comments != null) {
//             return (
//                 <div>
//                     <h4>Comments</h4>
//                     <ul className="list-unstyled">
//                         {
//                             dish.comments.map((comm) => {
//                                 return (
//                                     <li>
//                                         <div>
//                                             {comm.comment}
//                                         </div>
//                                         <br />
//                                         <div>
//                                             --{comm.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comm.date)))}
//                                         </div>
//                                         <br />
//                                     </li>
//                                 );
//                             })
//                         }
//                     </ul>
//                 </div>
//             );
//         }
//         else {
//             return (
//                 <div></div>
//             );
//         }
//     };

//     render() {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12 col-md-5 m-1">
//                         {this.renderDish(this.props.dish)}
//                     </div>
//                     <div className="col-12 col-md-5 m-1">
//                         {this.renderComments(this.props.dish)}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default DishDetail;
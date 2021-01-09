import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderDish(dish) {
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

    renderComments(dish) {
        if (dish!=null && dish.comments != null) {
            return (
                <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {
                        dish.comments.map((comm) => {
                            return(
                                <li>
                                    <div>
                                        {comm.comment}
                                    </div>
                                    <br/>
                                    <div>
                                        --{comm.author} , {Date(comm.date).toString()}
                                    </div>
                                    <br/>
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

    render() { 
        return (  
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );
    }
}

export default DishDetail;
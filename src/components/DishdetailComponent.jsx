import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Col>
                <Row className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating"
                    name="rating"
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="name">Your Name</Label>
                  <Control.text model=".author"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 charachters",
                      maxLength: "Must be 15 charachters or less"
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="message">Comment</Label>
                  <Control.textarea model=".comment"
                    className="form-control"
                    type="textarea"
                    id="message"
                    name="message"
                    rows="6" />
                </Row>
                <Row className="form-group">
                  <Button type="submit" color="primary">
                    Submit
                    </Button>
                </Row>
              </Col>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" object src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle heading>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
};

function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
              </li>
            );
          })}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
};


const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id} />
          </div>
        </div><br />
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
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
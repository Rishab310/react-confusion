import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';

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
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
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
                  <Control.text model=".name"
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
                    <Control.textarea model=".message"
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
function RenderComments({ comments }) {
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
        </ul><br />
        <CommentForm />
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
          <RenderComments comments={props.comments} />
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
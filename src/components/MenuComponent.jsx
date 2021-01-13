import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";


function RenderMenuItem({ dish, onClick }) {
    return (
    <Card onClick={() => onClick(dish.id)} >
        <CardImg width="100%" object src={dish.image} alt={dish.name} />
        <CardImgOverlay body className="ml-5">
            <CardTitle heading>{dish.name}</CardTitle>
        </CardImgOverlay>
    </Card>
    );
}
function Menu(props) {
    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish ={dish} onClick = {props.onClick}/>
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
    );
    
}

export default Menu;


// Before Changing to functional components

// class Menu extends Component {
    
//     render() {

//         const menu = this.props.dishes.map((dish) => {
//             return (
//                 <div key={dish.id} className="col-12 col-md-5 m-1">
//                     <Card onClick = {() => this.props.onClick(dish.id)} >
//                         <CardImg width="100%" object src={dish.image} alt={dish.name} />
//                         <CardImgOverlay body className="ml-5">
//                             <CardTitle heading>{dish.name}</CardTitle>
//                         </CardImgOverlay>
//                     </Card>
//                 </div>
//             );
//         });

//         return (
//             <div className="container">
//                 <div className="row">
//                     {menu}
//                 </div>
//             </div>
//         );
//     }
// }
// export default Menu;
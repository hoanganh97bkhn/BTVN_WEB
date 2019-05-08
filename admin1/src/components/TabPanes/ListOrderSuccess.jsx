import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config';
import './styles/listOrderSuccess.css';
import {
    Table,
    Button,
    Input,
    Label,
    Row,
    Col,
    Modal,
    ListGroup,
    ListGroupItem,
    FormGroup,
    Fade
} from 'reactstrap'


class ListOrderSuccess extends Component {
    constructor(props){
        super(props);
        this.state = {
            isopenModal : false,
            isopenModalFade : false,
            fadeIn : false,
            modalItems : {},
            indexModal : 0,
            years : [],
            month : [],
            date : [],
            day : [],
            listSuccess : []
        }
    }

    handleClickRow = (item, index) => {

       let j ='';
        item.production.map((temp, i)=>(j=j+temp.name + '*(' + temp.quantity + ') ,' ))
        item.sp =j;
        this.setState({
            isopenModal : !this.state.isopenModal,                               //bat su kien slick row
            modalItems : item,
            indexModal : index
        })
    }

    toggle = ()=>{
        this.setState({
            isopenModal : !this.state.isopenModal
        })
    }   

    toggleFade = () => {
        // call axios
        axios({
            url: `${config.baseUrl}/api/list-success/`,
            method: `get`,
            })
            .then((response) => {
            console.log(response.data);
            this.setState({ 
                listSuccess :  this.setState.listSuccess.concat(response.data),                        //upload lisdata-success
            });
            })
            .catch((error) => console.log(error));

        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }

    deleteOrder = (index) => {
        let item = this.state.listSuccess[index];
        this.setState({
            listSuccess : this.state.listSuccess.filter((todoItem)=>{                               //deleteOrder in all
              if(todoItem === item) return false;
              else return true;
            }),
            isopenModalFade : !this.state.isopenModalFade
          })
        
    }

    deleteOrderToday = (index) => {
        let item = this.props.getListSuccess[index];                                                //deleteOrder in today
        this.props.setListOrderSuccessToday(item);
        this.setState({
            isopenModal : !this.state.isopenModal
        })
    }

    handleSearch = (e) => {
        
    }

    handleSubmit = (e) => {
        
        let listSuccess = this.state.listSuccess.concat(this.props.getListSuccess);                   //su kien upload data to server
        console.log(listSuccess)
        // call axios
        axios({
            url: `${config.baseUrl}/api/saveOrder/`,
            method: `get`,
            data : listSuccess
            })
            .catch((error) => console.log(error));
        
    }
    render() {
        console.log(this.state.listOffline);
        return (
        <div className='container-fluid my-4'>
            <Row>
                <Col sm='1'></Col>
                <Col sm='10' className='listSuccess'>
                <h2 className="my-3">List Order Success</h2>
            <Button className="my-3" color="success" onClick={this.handleSubmit}>Update</Button>
            <h4 className=" my-2">Online</h4>
 

{/*mua hang online*/}

            <Table hover>
                    <thead style={{backgroundColor : '#f5f6fa'}}>
                        <tr>
                            <th>ID</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Total (VND)</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.getListSuccess.map((item, index) => { return (
                            <tr className='tablebody' key={index} onDoubleClick = { (e) => {this.handleClickRow(item, index)}}>
                                <th>{index + 1}</th>
                                <td>{item.time.getHours()}:{item.time.getMinutes()}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.total}</td>
                                
                            </tr>
                        )})}
                    </tbody>
                  <Modal 
                    className='CustomModal container-fluid'
                    isOpen={this.state.isopenModal}
                    toggle={this.toggle}>

                    <h3 style = {{'textAlign' : 'center'}}>Don hang</h3>
                    <ListGroup>
                    <ListGroupItem>id : {this.state.indexModal}</ListGroupItem>
                        <ListGroupItem>Name : {this.state.modalItems.name}</ListGroupItem>
                        <ListGroupItem>Phone : {this.state.modalItems.phone}</ListGroupItem>
                        <ListGroupItem>Address : {this.state.modalItems.address}</ListGroupItem>
                        <ListGroupItem>Prodcution : {this.state.modalItems.sp}</ListGroupItem>
                        <ListGroupItem>Total Price : {this.state.modalItems.total}</ListGroupItem>
                    </ListGroup>
                    <Button color="danger" onClick={(e)=>{this.deleteOrderToday(this.state.indexModal)}}>Delete</Button>

                  </Modal>
                </Table>

{/* goi all listorder */}

            <Button color="primary" onClick={this.toggleFade}>Show All</Button>
                
            <Fade in={this.state.fadeIn}>
                <Row className='my-3'>
                  
                </Row>
                <Table hover>
                    <thead style={{backgroundColor : '#f5f6fa'}}>
                        <tr>
                            <th>ID</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Total (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listSuccess.map((item, index) => {return (
                            <tr className='tablebody' key={index} onDoubleClick = { (e) => {this.handleClickRow(item, index)}}>
                                <th>{index + 1}</th>
                                <td>{item.time.getHours()}:{item.time.getMinutes()}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.total}</td>
                            </tr>
                        )})}
                    </tbody>
                  <Modal 
                    className='CustomModal container-fluid'
                    isOpen={this.state.isopenModalFade}
                    toggle={this.toggle}>

                    <h3 style = {{'textAlign' : 'center'}}>Don hang</h3>
                    <ListGroup>
                    <ListGroupItem>id : {this.state.indexModal}</ListGroupItem>
                        <ListGroupItem>Name : {this.state.modalItems.name}</ListGroupItem>
                        <ListGroupItem>Phone : {this.state.modalItems.phone}</ListGroupItem>
                        <ListGroupItem>Address : {this.state.modalItems.address}</ListGroupItem>
                        <ListGroupItem>Prodcution : {this.state.modalItems.production}</ListGroupItem>
                        <ListGroupItem>Total Price : {this.state.modalItems.total}</ListGroupItem>
                    </ListGroup>

                    <Button color="danger" onClick={(e)=>{this.deleteOrder(this.state.indexModal)}}>Delete</Button>

                  </Modal>
                </Table>
            </Fade>
                </Col>
                <Col sm='1'></Col>
            </Row>
            
                

        </div>
        );
    }
}

export default ListOrderSuccess;


import React, { Component } from 'react';
import './styles/editProduction.css';
import PrintButton from '../commons/PrintButton';
import Bills from '../commons/Bills';

import {
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Table,
     } from 'reactstrap';

     let productions = [{}];
     let count = 0;
class ListOrderOffline extends Component {

    constructor(props){
        super(props);
        this.state = {
            round : [1],
            ListOrderOffline : [],
            object : {},
            fadeIn : false,
            hello : []
        }
        this.addRound = this.addRound.bind(this)
    }
    addRound = () => {
        count +=1;
        productions[this.state.round.length]={};
        let temp = this.state.object;
        temp.production = productions;
        this.setState({
            round : [...this.state.round,this.state.round[this.state.round.length -1 ] +1],
            ListOrderOffline : [...this.state.ListOrderOffline, temp]
        })
    }

    toggle = () => {
        
        this.setState({
            fadeIn: !this.state.fadeIn,
        });
        
    }
    

    clickSubmit = (e)=>{
        if(count === 0){
        let temp = this.state.object;
        temp.production = productions;
        this.setState({
            ListOrderOffline : [...this.state.ListOrderOffline, temp]
        })
        }
        else {
            this.setState ({
                object : {},
                fadeIn : false
            })
            productions =[{}]
        }
        count = 0;
        
        
        
    }

    clickUpload = (e) => {
        this.setState({
            round : [1]
        })
        this.props.updateListOffline(this.state.ListOrderOffline[this.state.ListOrderOffline.length-1])
    }
    

    render() {
        console.log(this.state.ListOrderOffline, this.state.object ,productions)
        return (
            <div className='container-fluid my-4'>
                <Row>
                    <Col sm='3'></Col>
                    <Col sm='6'>
                        <Form className='editProduction'>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input onChange={(e)=>{this.setState({object :{...this.state.object, name : e.target.value } })}} name="name" id="name" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="phone">Phone</Label>
                                <Input onChange={(e)=>{this.setState({object :{...this.state.object, phone : e.target.value } })}} name="phone" id="phone" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="address">Address</Label>
                                <Input onChange={(e)=>{this.setState({object :{...this.state.object, address : e.target.value } })}} name="address" id="address" />
                            </FormGroup>
                            <Table hover>
                    <thead style={{backgroundColor : '#f5f6fa'}}>
                        <tr>
                            <th>ID</th>
                            <th>Production</th>
                            <th>Quantity</th>
                            <th>Price ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.round.map((item, index) => { return (
                            <tr className='tablebody' key={index}>
                                <th>{item}</th>
                                <th><Input onChange={(e)=>{productions[index].name=e.target.value}}></Input></th>
                                <th><Input onChange={(e)=>{productions[index].quantity=e.target.value}}></Input></th>
                                <th><Input onChange={(e)=>{productions[index].price=e.target.value}}></Input></th>
                            </tr>
                        )})}
                    </tbody>
                    </Table>
                            <Button className='mr-2' onClick={this.addRound}>add round</Button>
                            <Button className='mx-2' onClick={this.clickSubmit} color="success">Success</Button>
                            <Button className='mx-2' color="primary" onClick={this.toggle} > Bills </Button>
                            <Button className='mt-2 d-block' color="success" onClick={this.clickUpload} >Up load</Button>
                            <PrintButton id={"printbill"} label={"Print Bill"}></PrintButton>
                            
                        </Form>

                        {this.state.fadeIn === true ? <Bills id={"printbill"}  bills = {this.state.ListOrderOffline[this.state.ListOrderOffline.length-1]}/> : null}
                    </Col>

                </Row>
            </div>
        );
    }
}

export default ListOrderOffline;
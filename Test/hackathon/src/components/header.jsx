import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    Input,
    InputGroupButtonDropdown } from 'reactstrap';
class header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.colorBorder = this.colorBorder.bind(this);

        this.state = {
          isOpen: false,
          dropdownOpen: false,
          temp : false
        };
      }

    inputFocus(){
        this.setState({
            temp : true
        })
    }

    colorBorder(){
        if(this.state.temp === true) {
            return {
                 border : '1px none primary'
            }
        }
    }

    toggleDropDown() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() {
        return (
            <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
          <InputGroup>
          <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle caret>
              Button Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem >HaNoi</DropdownItem>
              <DropdownItem >HoChiMinh</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input onClick={this.state.inputFocus} style={this.state.colorBorder}/>
        </InputGroup>
          </NavbarBrand>
          
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        
      </div>
        );
    }
}

export default header;
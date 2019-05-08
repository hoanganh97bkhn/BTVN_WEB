import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '../node_modules/datatables.net/js/jquery.dataTables';
import '../node_modules/datatables.net-dt/css/jquery.dataTables.min.css';

class App extends Component {
  render() {
    return (
      <div class="container-fluid">
        <h1>List of users</h1>
        <table class="table table-striped" id="users">
          <thead >
      <tr id="list-header">
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Address</th>
        <th scope="col">Phone</th>
      </tr>
          </thead>  
      <tbody> 
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>     
      </tbody>
      <tbody> 
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>     
      </tbody>
      <tbody> 
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>     
      </tbody>
      <tbody> 
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>     
      </tbody>
      <tbody> 
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>
        <th>1</th>     
      </tbody>
        </table>
        <button type="button" class="btn btn-primary" id="btnReloadData">Reload data</button>
    </div>
    );
  }
}

export default App;

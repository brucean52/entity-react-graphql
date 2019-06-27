import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import * as go from "gojs";
import EntityDiagram from '../components/EntityDiagram';



class DiagramComponent extends Component {
  constructor(props){
    super(props);

    this.state = {
        title: ''
    }
  }

  render() {
    return (
      <Query query={GET_ENTITIES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
  
  
        console.log('data response', data);
        return (
          <EntityDiagram nodeDataArray={nodeDataArray} linkDataArray={linkDataArray}/>
        );
      }}
    </Query> 
    );
  }
}

const GET_ENTITIES = gql`
query {
  getAllEntities {
    title
    entityDefinitions {
      name
    }
  }

  getEntityByTitle(title: "Person"){
    title
    description
    entityDefinitions {
      name
      primaryKey
      required
      wordLexicon
      properties {
        name
        datatype
        ref
      }
    }
  }
}
`;

var $ = go.GraphObject.make; 
var bluegrad = $(go.Brush, "Linear", { 0: "rgb(150, 150, 250)", 0.5: "rgb(86, 86, 186)", 1: "rgb(86, 86, 186)" });
var greengrad = $(go.Brush, "Linear", { 0: "rgb(158, 209, 159)", 1: "rgb(67, 101, 56)" });
var redgrad = $(go.Brush, "Linear", { 0: "rgb(206, 106, 100)", 1: "rgb(180, 56, 50)" });
var yellowgrad = $(go.Brush, "Linear", { 0: "rgb(254, 221, 50)", 1: "rgb(254, 182, 50)" });

var nodeDataArray = [
  {
    key: "Products",
    items: [{ name: "ProductID", iskey: true, figure: "Decision", color: yellowgrad },
    { name: "ProductName", iskey: false, figure: "Cube1", color: bluegrad },
    { name: "SupplierID", iskey: false, figure: "Decision", color: "purple" },
    { name: "CategoryID", iskey: false, figure: "Decision", color: "purple" }]
  },
  {
    key: "Suppliers",
    items: [{ name: "SupplierID", iskey: true, figure: "Decision", color: yellowgrad },
    { name: "CompanyName", iskey: false, figure: "Cube1", color: bluegrad },
    { name: "ContactName", iskey: false, figure: "Cube1", color: bluegrad },
    { name: "Address", iskey: false, figure: "Cube1", color: bluegrad }]
  },
  {
    key: "Categories",
    items: [{ name: "CategoryID", iskey: true, figure: "Decision", color: yellowgrad },
    { name: "CategoryName", iskey: false, figure: "Cube1", color: bluegrad },
    { name: "Description", iskey: false, figure: "Cube1", color: bluegrad },
    { name: "Picture", iskey: false, figure: "TriangleUp", color: redgrad }]
  },
  {
    key: "Order Details",
    items: [{ name: "OrderID", iskey: true, figure: "Decision", color: yellowgrad },
    { name: "ProductID", iskey: true, figure: "Decision", color: yellowgrad },
    { name: "UnitPrice", iskey: false, figure: "MagneticData", color: greengrad },
    { name: "Quantity", iskey: false, figure: "MagneticData", color: greengrad },
    { name: "Discount", iskey: false, figure: "MagneticData", color: greengrad }]
  },
];
var linkDataArray = [
  { from: "Products", to: "Suppliers", text: "0..N", toText: "1" },
  { from: "Products", to: "Categories", text: "0..N", toText: "1" },
  { from: "Order Details", to: "Products", text: "0..N", toText: "1" }
];
export default DiagramComponent;
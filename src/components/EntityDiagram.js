import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import * as go from "gojs";
const goObj = go.GraphObject.make;

class EntityDiagram extends Component {
  constructor(props){
    super(props);

    this.renderCanvas = this.renderCanvas.bind(this);

    this.state = {myDiagram: null}
  }
  renderCanvas () {
    var lightgrad = goObj(go.Brush, "Linear", { 1: "#E6E6FA", 0: "#FFFAF0" });
    let diagram = goObj(go.Diagram, this.refs.goJsDiv,  // must name or refer to the DIV HTML element
      {
        allowDelete: false,
        allowCopy: false,
        layout: goObj(go.ForceDirectedLayout),
        "undoManager.isEnabled": true
      });
    var itemTempl =
    goObj(go.Panel, "Horizontal",
      goObj(go.Shape,
        { desiredSize: new go.Size(10, 10) },
        new go.Binding("figure", "figure"),
        new go.Binding("fill", "color")),
        goObj(go.TextBlock,
        {
          stroke: "#333333",
          font: "bold 14px sans-serif"
        },
        new go.Binding("text", "name"))
    );
    // define the Node template, representing an entity
    diagram.nodeTemplate =
    goObj(go.Node, "Auto",  // the whole node panel
        {
          selectionAdorned: true,
          resizable: true,
          layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
          fromSpot: go.Spot.AllSides,
          toSpot: go.Spot.AllSides,
          isShadowed: true,
          shadowColor: "#C5C1AA"
        },
        new go.Binding("location", "location").makeTwoWay(),
        // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
        // clear out any desiredSize set by the ResizingTool.
        new go.Binding("desiredSize", "visible", function(v) { return new go.Size(NaN, NaN); }).ofObject("LIST"),
        // define the node's outer shape, which will surround the Table
        goObj(go.Shape, "Rectangle",
          { fill: lightgrad, stroke: "#756875", strokeWidth: 3 }),
          goObj(go.Panel, "Table",
          { margin: 8, stretch: go.GraphObject.Fill },
          goObj(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
          // the table header
          goObj(go.TextBlock,
            {
              row: 0, alignment: go.Spot.Center,
              margin: new go.Margin(0, 14, 0, 2),  // leave room for Button
              font: "bold 16px sans-serif"
            },
            new go.Binding("text", "key")),
          // the collapse/expand button
          goObj("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
            { row: 0, alignment: go.Spot.TopRight }),
          // the list of Panels, each showing an attribute
          goObj(go.Panel, "Vertical",
            { 
              name: "LIST",
              row: 1,
              padding: 3,
              alignment: go.Spot.TopLeft,
              defaultAlignment: go.Spot.Left,
              stretch: go.GraphObject.Horizontal,
              itemTemplate: itemTempl
            },
            new go.Binding("itemArray", "items"))
        )  // end Table Panel
      );  // end Node
    diagram.linkTemplate =
    goObj(go.Link,  // the whole link panel
        {
          selectionAdorned: true,
          layerName: "Foreground",
          reshapable: true,
          routing: go.Link.AvoidsNodes,
          corner: 5,
          curve: go.Link.JumpOver
        },
        goObj(go.Shape,  // the link shape
          { stroke: "#303B45", strokeWidth: 2.5 }),
          goObj(go.TextBlock,  // the "from" label
          {
            textAlign: "center",
            font: "bold 14px sans-serif",
            stroke: "#1967B3",
            segmentIndex: 0,
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding("text", "text")),
          goObj(go.TextBlock,  // the "to" label
          {
            textAlign: "center",
            font: "bold 14px sans-serif",
            stroke: "#1967B3",
            segmentIndex: -1,
            segmentOffset: new go.Point(NaN, NaN),
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding("text", "toText"))
      );
      diagram.model = goObj(go.GraphLinksModel,
        {
          copiesArrays: true,
          copiesArrayObjects: true,
          nodeDataArray: this.props.nodeDataArray,
          linkDataArray: this.props.linkDataArray
        });                  
      this.setState({ myDiagram: diagram});
    }
  
  componentDidMount () {
    this.renderCanvas ();
  }
  render () {
    return <div ref="goJsDiv" style={{'width': '100%', 'height': '700px', 'backgroundColor': '#DAE4E4'}}></div>;
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


export default EntityDiagram;
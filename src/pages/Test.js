import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Entities from '../components/Entities';

class Test extends Component {
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
          <div>
            Check Console Log! 
          </div>
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


export default Test;
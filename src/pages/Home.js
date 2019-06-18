import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Entities from '../components/Entities';

class Home extends Component {
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
  
        const renderEntity = data.getAllEntities.map( (item, index) => {
          return (
            <Entities entity={item} key={index}/>
          )
        });
  
        console.log('data response', data);
        return (
          <div>
            {renderEntity}
          </div>
        );
      }}
    </Query> 
    );
  }
}

const GET_ENTITIES = gql`
  {
    getAllEntities {
      title
      entityDefinitions {
        name
        properties {
          name
        }
      }
    }
  }
`;


export default Home;
import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";


class EntityDetail extends Component {
  constructor(props){
    super(props);
    let path = this.props.location.pathname.split('/')
    this.state = {
        title: path[2]
    }
  }

  render() {
    const {title} = this.state;
    const { location } = this.props
     console.log('location', location);
    return (
      <Query query={GET_ENTITY} variables={{title}}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        const { getEntityByTitle } = data;

        const entityDefs = getEntityByTitle.entityDefinitions.map((entity, index)=> {
          let properties = entity.properties.map((property, index)=>{
            return(
              <div key={index} className="property-container">
                <h5 className='prop-name'>{property.name ? 'Name: '+ property.name  : null}</h5>
                <h5 className='prop-datatype'>{property.datatype ? 'Data Type: '+ property.datatype  : null}</h5>
                <h5 className='prop-ref'>{property.ref ? 'Ref: '+ property.ref  : null}</h5>
              </div>
            )
          });

          return(
            <div key={index} className="entity-def-container">
            <h3 className="entity-def-name">Entity Definition: {entity.name}</h3>
            <h4>{entity.primaryKey ? 'Primary Key: '+ entity.primaryKey : null}</h4>
            <h4>{entity.wordLexicon ? 'Word Lexicon: '+ entity.wordLexicon : null}</h4>
            <h4>{entity.required ? 'Required: '+ entity.required : null}</h4>
              {properties}
            </div>
          )
        });

        return (
          <div className="entity-container">
            <h2>Entity Model: {getEntityByTitle.title}</h2>
            <h6>BaseUri: {getEntityByTitle.baseUri}</h6>
            <h6>Description: {getEntityByTitle.description}</h6>
            <h6>Version: {getEntityByTitle.version}</h6>
            {entityDefs}
        </div>
        );
      }}
    </Query> 
    );
  }
}

const GET_ENTITY = gql`
  query getEntityModel($title: String!) { 
    getEntityByTitle(title: $title){
      title
      description
      baseUri
      version
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

export default EntityDetail;
import React from 'react';
import { Link } from 'react-router-dom';

const Entities = props => {
  const { entity } = props;

  const renderEntities = entity.entityDefinitions.map((item, index)=>{
    let properties = item.properties.map((property, index)=>{
      return(
        <div key={index} className="property-container">
          <h5>{property.name}</h5>
        </div>
      )
    });
    return(
      <div key={index} className="entity-def-container">
        <h3>Entity Definition: {item.name}</h3>
        {properties}
      </div>
    )
  });
  return(
    <div className="entities-container">
      <Link className="entity" to={`/entities/${entity.title}`}>
        Entity Model: {entity.title}
      </Link>
      {renderEntities}
    </div>
  )
}



export default Entities;
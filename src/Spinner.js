import React from 'react';

const Spinner = props => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white'
      }}>
      <div className="spinner-grow" role="status">
        <span className="sr-only">{props.message}</span>
      </div>
    </div>
  );
};

Spinner.defaultProps = {
  message: 'Carregando...'
};

export default Spinner;

import React from 'react';

const ErrorP = React.createClass({
  propTypes: {
    status:      React.PropTypes.number
  , message:     React.PropTypes.string
  , description: React.PropTypes.string
  }

, renderDescription() {
    if ( this.props.description ) {
      return (
        <p className="error-description">
          {this.props.description}
        </p>
      );
    }
  }

, render() {
    return (
      <div className="error-page">
        <h1 className="logo"></h1>
        <h1>Error {this.props.status}</h1>
        <h2>{this.props.message}</h2>
        {this.renderDescription()}
      </div>
    );
  }
});

const e404 = React.createClass({
  render() {
    return (
      <ErrorP
        status      = {404}
        message     = "Page Not Found"
        description = "The page you are looking for does not exist."
      />
    );
  }
});

export default Error;
export { e404 };

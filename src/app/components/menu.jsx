import React from 'react';
import Router from 'react-router';

const { Link } = Router;

const Item = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  , icon: React.PropTypes.string.isRequired
  }

, renderName() {
    if ( this.props.name ) {
      return (
        <div className="sidebar-nav-name">
          {this.props.name}
        </div>
      );
    } else {
      return null;
    }
  }

, render() {
    return (
      <li className={`sidebar-nav-item ${this.props.className}`}>
        <Link to={this.props.to}>
          <i className={`fa fa-${this.props.icon}`}></i>
        </Link>
        {this.renderName()}
      </li>
    );
  }
});

const Entry = React.createClass({
  render() {
    return (
      <li className="sidebar-menu-item">{this.props.name}</li>
    );
  }
});

const Menu = React.createClass({
  render() {
    return (
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav-upper">
            <Item icon="bold" to="home" className="sidebar-nav-home logo"/>
            <Item icon="plus-circle" name="add" to="home" />
            <Item icon="copy" name="content" to="home" />
            <Item icon="pie-chart" name="stats" to="home" />
            <Item icon="user" name="users" to="home" />
            <Item icon="bell" name="notifications" to="home" />
          </ul>
          <ul className="nav-lower">
            <Item icon="cog" name="settings" to="home" />
          </ul>
        </nav>

        <nav className="sidebar-menu">
          <h1 className="sidebar-menu-title">Statistics</h1>
          <ul>
            <Entry name="foo" />
            <Entry name="bar" />
            <Entry name="baz" />
          </ul>
        </nav>
      </aside>
    );
  }
});

export default Menu;

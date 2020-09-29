import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchIssue } from '../actions';
import IssueAuthor from './IssueAuthor';

class Issue extends React.Component {
  componentDidMount() {
    this.props.fetchIssue(this.props.match.params.id);
  }

  renderNavigation() {
    return (
      <div className="ui breadcrumb">
        <Link to='/' className='section'>Home</Link>
        <div className="divider">/</div>
        <Link to={ `/repositories/${this.props.issue.id}` } className='section'>Repo name</Link>
        <div className="divider">/</div>
        <div className="active section">#{ this.props.issue.number }</div>
      </div>
    );
  }

  render() {
    const { issue } = this.props;

    if (!issue) { return null; }

    return (
      <div className='ui container page-wrapper'>
        { this.renderNavigation() }

        <h1 className='ui header'>
          { issue.title }
          <div className='ui sub header'>
            #{ issue.number }
          </div>
        </h1>

        <IssueAuthor issue={ issue } />

        <div className='ui divider'></div>

        <div>{ issue.body }</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    issue: state.issues[ownProps.match.params.id]
  }
}

export default connect(
  mapStateToProps,
  { fetchIssue }
)(Issue);

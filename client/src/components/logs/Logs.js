import { useEffect } from 'react';
// This module is responsible for connect react and redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLogs } from '../../actions/logAction';

import LogItem from './LogItem';
import Preloader from '../layouts/Preloader';

// action such as getLogs comes within props so needs to be destructured
const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  // API request could take long... if the state was assigned as null then need extra condition
  if (loading || logs === null) {
    return <Preloader></Preloader>;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>

      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show...</p>
      ) : (
        logs.map((log) => <LogItem key={log.id} log={log} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

// To bring global state use -> connect() and it takes 2 things
// MapState to props
const mapStateToProps = (state) => ({
  // In this instance, log is the entire state I defined earlier inside logReducer
  // state.log comes from index.js combineReducers
  log: state.log,
  // If I wanted only pieces of whole state of log then...
  // logs: state.log.logs
  // loading: state.log.loading
});

export default connect(mapStateToProps, { getLogs })(Logs);

import React from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import { deleteLog, setCurrent } from '../../actions/logAction';

const LogItem = ({ log, deleteLog, setCurrent }) => {
  const onDelete = () => {
    deleteLog(log._id);

    M.toast({ html: 'Log Deleted' });
  };

  return (
    <li key={log.id} className='collection-item'>
      {/* href can open up a modal to edit the log */}
      <a
        href='#edit-log-modal'
        className={`modal-trigger ${log.attention ? 'red-text' : 'blue-text'}`}
        onClick={() => setCurrent(log)}
      >
        {log.message}
      </a>
      <br />
      <span className='grey-text'>
        <span className='black-text'>ID #{log._id}</span>Last updated By{' '}
        <span className='black-text'>{log.tech}</span> on{' '}
        <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.date}</Moment>
      </span>
      {/* #! for href means redirecting nowhere */}
      <a href='#!' onClick={onDelete} className='secondary-content'>
        <i className='material-icons grey-text'>delete</i>
      </a>
    </li>
  );
};

LogItem.prototype = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog, setCurrent })(LogItem);

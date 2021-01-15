import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { searchLogs } from '../../actions/logAction';

const SearchBar = ({ searchLogs }) => {
  const text = useRef('');

  // We don't have submit button and I want it to filter as we type.
  // meaning as user type inside the search input it will be making GET request
  const onChange = (e) => {
    searchLogs(text.current.value);
  };

  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Search logs'
              ref={text}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
};

export default connect(null, { searchLogs })(SearchBar);

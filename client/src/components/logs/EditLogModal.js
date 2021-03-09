import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

import TechSelectOptions from '../techs/TechSelectOptions';

import { clearCurrent, updateLog } from '../../actions/logAction';

const EditLogModal = ({ log: { current }, clearCurrent, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      // console.log('This is from EditLogModal', message, tech, attention);
      const editedLog = {
        id: current._id,
        message,
        attention,
        tech,
        date: new Date(),
      };

      updateLog(editedLog);
      M.toast({ html: `Log updated by ${tech}` });
      //   Clear Fields
      clearCurrent();
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    //   add-log-modal will look for the <a href='#add-log-modal'> from AddBtn component
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Edit System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={(e) => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technicians
              </option>
              {/* Somehow default selects are not the same on edit */}
              <TechSelectOptions />
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={(e) => {
                    setAttention(!attention);
                    console.log(attention);
                  }}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

EditLogModal.prototype = {
  log: PropTypes.object.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  updateLog: PropTypes.func.isRequired,
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

const mapToStateProps = (state) => ({
  log: state.log,
});

export default connect(mapToStateProps, { clearCurrent, updateLog })(
  EditLogModal
);

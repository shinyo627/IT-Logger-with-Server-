import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

import SearchBar from '../layouts/SearchBar';
import Logs from '../logs/Logs';
import AddBtn from '../layouts/AddBtn';
import AddLogModal from '../logs/AddLogModal';
import EditLogModal from '../logs/EditLogModal';
import AddTechModal from '../techs/AddTechModal';
import TechListModal from '../techs/TechListModal';

import { loadUser } from '../../actions/authAction';

const Home = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
    // Init Materialize JS so I can use modals
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <SearchBar />
      <div className='container'>
        <AddBtn />
        <AddLogModal />
        <EditLogModal />
        <AddTechModal />
        <TechListModal />
        <Logs />
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default connect(null, { loadUser })(Home);

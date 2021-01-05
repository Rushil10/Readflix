import * as React from 'react';
import { View, Text ,Button} from 'react-native';
import {logoutUser} from '../redux/actions/userActions'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

function HomeScreen(props) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="LogOut" onPress={() => props.logoutUser(() => props.navigation.replace('Login'))} />
      </View>
    );
  }

HomeScreen.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI:state.UI
})

const mapActionsToProps = {
    logoutUser
}

export default connect(mapStateToProps,mapActionsToProps)(HomeScreen);
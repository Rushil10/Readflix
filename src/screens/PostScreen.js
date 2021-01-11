import * as React from 'react';
import { View,StyleSheet, BackHandler} from 'react-native';
import { Avatar, Card, Spinner, Text ,Input,Calendar,Datepicker,Select,IndexPath,SelectItem,Button} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { useColorScheme } from 'react-native-appearance';
import {getPost} from '../redux/actions/dataActions'

function PostScreen(props){

    const id = props.route.params.postId

    const backAction = () => {
        props.navigation.goBack()
        return true
    }

    React.useEffect(() => {
        props.getPost(id)
        BackHandler.addEventListener("hardwareBackPress",backAction)
        return () => BackHandler.removeEventListener('hardwareBackPress',backAction)
    },[])

    console.log(props.user)
    return (
        <View>
            <View style={styles.head}>
                <Avatar source={require('../profile_photo/new.jpg')} size='giant' />
                <Text>{props.user.username}</Text>
            </View>
        </View>
    )
}

PostScreen.propTypes = { 
    getPost:PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI:state.UI,
    data:state.data
})

const mapActionsToProps = {
    getPost
}

const styles = StyleSheet.create({
    head:{
        flexDirection:'row',
        margin:9
    }
})

export default connect(mapStateToProps,mapActionsToProps)(PostScreen);


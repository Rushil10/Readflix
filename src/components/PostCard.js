import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Layout, Text,Avatar } from '@ui-kitten/components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {imgloc} from '../imgloc'
import { useColorScheme } from 'react-native-appearance';

let usernam = null;
let imgname = null;

const userImage = () => (
    <Avatar source={require('../profile_photo/no-image.jpg')} />
)

const Header = (props) => (
    <View {...props} style={styles.head}>
        <Avatar style={styles.photo} source={require('../profile_photo/no-image.jpg')} />
        <Text style={styles.user}>{usernam}</Text>
    </View>
)

let theme='light';
let bgcolor='white'

function PostCard(props) {
    let stat = 'danger';
    const scheme = useColorScheme()
    theme=scheme;
    {scheme === 'dark' ? stat='basic' : stat='info'}
    {scheme === 'dark' ? bgcolor='#0F0F0F' : bgcolor='white'}
    const {post:{name,image_name,commentcount,post_id,postedAt,review,start_date,username}} = props;
    usernam=username;
    imgname=image_name;
    return (
        <Card style={{backgroundColor:bgcolor,borderRadius:15,margin:5}} status={stat} header={Header}>
            <Text style={styles.name}>Name : {name}</Text>
            <Text style={styles.review}>Review : {review} </Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    card:{
        
    },
    head:{
        flexDirection:'row',
        margin:9
    },
    photo:{
        marginLeft:5
    },
    user:{
        margin:9
    },
    name:{
        margin:7,
        marginLeft:0,
        fontSize:15
    },
    review:{
        margin:7,
        marginLeft:0,
        fontSize:15
    }
})

export default PostCard;
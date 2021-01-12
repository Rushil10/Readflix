import React from 'react';
import { StyleSheet, View,Image, TouchableOpacity } from 'react-native';
import { Button, Card, Layout, Text,Avatar, Icon, Input } from '@ui-kitten/components';
import { useColorScheme } from 'react-native-appearance';

function CommentCard(props) {
    const scheme = useColorScheme();
    let bgcolor;
    {scheme === 'dark' ? bgcolor='#0F0F0F' : bgcolor='white'}
    return (
        <View>
            <View style={styles.row}>
            <View style={{flexDirection:'column',justifyContent:'center'}}>
            <Avatar source={require('../profile_photo/new.jpg')} size='small' />
            </View>
                <View style={styles.col}>
                    <Text style={styles.topRow}>{props.comments.username}</Text>
                    <Text style={styles.comm}>{props.comments.comment}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        margin:5,
        marginLeft:5,
        maxWidth:285
    },
    col:{
        flexDirection:'column'
    },
    topRow:{
        flex:4,
        marginLeft:5,
        fontSize:13
    },
    comm:{
        flex:2,
        marginLeft:5
    }
})

export default CommentCard;
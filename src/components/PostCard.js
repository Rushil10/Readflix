import React from 'react';
import { StyleSheet, View,Image, TouchableOpacity } from 'react-native';
import { Button, Card, Layout, Text,Avatar, Icon, Input } from '@ui-kitten/components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {imgloc} from '../imgloc'
import { useColorScheme } from 'react-native-appearance';
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';
import {getPost} from '../redux/actions/dataActions'

let fi ='#1DA1F2'

const CommentIcon = () => (
    <Icon style={styles.icon} name='message-square-outline' fill={fi} />
)

const Header = ({username}) => (
    <View style={styles.head}>
        <Avatar style={styles.photo} source={require('../profile_photo/new.jpg')} />
        <Text style={styles.user}>{username}</Text>
    </View>
)

const Footer = ({commentcount,postedAt}) => (
    <View style={styles.head}>
        <CommentIcon />
        <Text style={styles.comcon}>{commentcount} comments</Text>
        <Text style={styles.postDate}>{moment(postedAt).fromNow()}</Text>
    </View>
)

let theme='light';
let bgcolor='white';
let post_date = null;
let cc = null;
//let color = 'azure'

function PostCard(props) {
    //console.log(props)
    const navigation = useNavigation();
    let stat = 'danger';
    const scheme = useColorScheme()
    theme=scheme;
    {scheme === 'dark' ? stat='basic' : stat='info'}
    {scheme === 'dark' ? bgcolor='#0F0F0F' : bgcolor='white'}
    //{scheme === 'dark' ? color='azure' : color='black'}
    const {post:{name,image_name,commentcount,post_id,postedAt,review,start_date,username}} = props;
    const {loading} = props.data
    cc=commentcount;
    const date = moment(start_date).format("DD MMMM YYYY")

    const postDetailsHandle = async(id,callback) => {
        await props.getPost(id)
        if(!loading){
            callback()
        }
    }

    return (
            <Card style={{backgroundColor:bgcolor,borderRadius:15,marginTop:9,marginLeft:5,marginRight:5}} status={stat} header={(props) => <Header {...props} username={username} /> } footer={(props) => <Footer {...props} commentcount={commentcount} postedAt={postedAt} />}>
            <TouchableOpacity onPress={() => props.navigation.push('Post',{postId:post_id})}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.review}>Review : {review} </Text>
            <Text style={styles.name}>{date}</Text>
            </TouchableOpacity>
            </Card>
    )
}

const styles = StyleSheet.create({
    head:{
        flexDirection:'row',
        margin:9
    },
    photo:{
        marginLeft:11,
        height:35,
        width:35,
        marginBottom:0
    },
    user:{
        marginBottom:0,
        marginTop:5,
        marginLeft:5,
    },
    name:{
        margin:5,
        marginLeft:0,
        fontSize:15
    },
    review:{
        margin:7,
        marginLeft:0,
        fontSize:15
    },
    postDate:{
        fontSize:13,
        marginLeft:'auto',
        marginTop:3,
    },
    comcon:{
        marginLeft:9,
        fontSize:13,
        marginTop:3
    },
    icon:{
        height:27,
        width:27,
        marginLeft:5,
        marginTop:1
    },
})

PostCard.propTypes = { 
    getPost:PropTypes.func.isRequired,
    //UI:PropTypes.object.isRequired,
    //user:PropTypes.object.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    //user:state.user,
    //UI:state.UI,
    data:state.data
})

const mapActionsToProps = {
    getPost
}

export default connect(mapStateToProps,mapActionsToProps)(PostCard);
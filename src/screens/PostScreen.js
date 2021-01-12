import * as React from 'react';
import { View,StyleSheet, BackHandler} from 'react-native';
import { Avatar, Card, Spinner, Text ,Input,Calendar,Datepicker,Select,IndexPath,SelectItem,Button,Icon} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { useColorScheme } from 'react-native-appearance';
import {getPost} from '../redux/actions/dataActions'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import {api} from '../api';
import moment from 'moment'
import { FlatList } from 'react-native-gesture-handler';
import CommentCard from '../components/CommentCard';

function PostScreen(props){

    let fi ='#1DA1F2'

    const CommentIcon = () => (
         <Icon style={styles.icon} name='message-square-outline' fill={fi} />
    )

    //console.log(props)

    const id = props.route.params.postId

    const [post,setPost] = React.useState({})
    const [comments,setComments] = React.useState([])
    const [comment,setComment] = React.useState(null)
    const [loadingComment,setLoadingComment] = React.useState(false)

    const commentOnPost = (comment) => {
        const comm = {
            comment
        }
        setLoadingComment(true)
        axios.post(`${api}/user/${id}/comment`,comm)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const getPostDetails = () => {
        axios.get(`${api}/post/${id}`)
        .then(res => {
            console.log(res.data)
            setPost(res.data.posts[0])
            setComments(res.data.comments)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const commen = (comment) => {
        commentOnPost(comment);
        getPostDetails();
        getPostDetails();
        setComment(null)
    }

    React.useEffect(() => {
        console.log(id)
        getPostDetails()
    },[])

    const date = moment(post.start_date).format("DD MMMM YYYY")

    return (
        <View style={{flex:1}}>
            {post.length !=0 ? (
                <View style={{flex:1}}>
                    <View style={styles.head}>
                    <Avatar style={{marginBottom:5}} source={require('../profile_photo/new.jpg')} />
                    <Text style={{flexDirection:'column', justifyContent:'center',lineHeight:31,marginLeft:9,fontSize:15}}>{post.username}</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderColor:'gray'}}>
                    <Text style={styles.info}>{post.name}</Text>
                    <Text style={styles.info}>{post.review}</Text>
                    <Text style={{margin:5,marginBottom:9,marginLeft:9}}>{date}</Text>
                    </View>
                    <View style={styles.down}>
                    <View style={styles.foot}>
                    <CommentIcon />
                    <Text style={styles.ftext}>{post.commentcount} comments</Text>
                    <Text style={styles.postDate}>{moment(post.postedAt).fromNow()}</Text>
                    </View>
                    </View>
                    <View>
                    <FlatList 
                    keyExtractor={item => item.comment_id.toString()}
                    data={Object.assign(comments)}
                    renderItem={data => <CommentCard comments={data.item} navigation={props.navigation} />}
                    />
                    </View>
                    <View style={styles.commentBox} >
                    <View style={{flexDirection:'row',margin:5}}>
                    <Input value={comment} style={{width:'81%'}} status='info' placeholder='Comment Here' onChangeText={newValue => setComment(newValue)}/>
                    <Button onPress={() => commen(comment)} style={{marginLeft:5,marginRight:15,height:'85%'}}>{loadingComment ? <Spinner /> : <Text>Post</Text>}</Button>
                    </View>
                    </View>
                    
                </View>
            ) : (
                <Spinner />
            )}
        </View>
    )
}

PostScreen.propTypes = { 
    getPost:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data:state.data
})

const mapActionsToProps = {
    getPost
}

const styles = StyleSheet.create({
    head:{
        flexDirection:'row',
        margin:9,
        borderColor:'gray',
        borderBottomWidth:1,
        lineHeight:37
    },
    info:{
        margin:5,
        marginLeft:9
    },
    foot:{
        flexDirection:'row',
        margin:5
    },
    icon:{
        height:25,
        width:25,
        marginLeft:5,
        marginTop:1
    },
    ftext:{
        marginTop:3,
        marginLeft:5,
        fontSize:13
    },
    down:{
        borderBottomColor:'gray',
        borderBottomWidth:1
    },
    postDate:{
        fontSize:13,
        marginLeft:'auto',
        marginTop:3,
    },
    commentBox:{
        marginBottom:0,
        flex:1,
        justifyContent:'flex-end',
    }
})

export default connect(mapStateToProps,mapActionsToProps)(PostScreen);


import * as React from 'react';
import { View, Text ,Button,ScrollView,RefreshControl,Dimensions} from 'react-native';
import {getBookPosts} from '../redux/actions/dataActions'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import PostCard from '../components/PostCard';
import {useFocusEffect, useIsFocused} from '@react-navigation/native'
import { Spinner } from '@ui-kitten/components';

function BooksScreen(props) {

    const height = Dimensions.get('window').height;

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true)
      props.getBookPosts()
      setRefreshing(false)
    },[refreshing])
    
      React.useEffect(() => {
        props.getBookPosts()
      },[])
    
      const {books,loading} = props.data
    
      let postsMarkup = !loading ? (
        books.map(post => <PostCard post={post} key={post.post_id}/>)
      ) : (
        <View style={{flex:1, justifyContent:'center' , alignItems:'center',marginTop:height/2 -45 }}>
        <Spinner size='giant' status='info' />
        </View>
      )
    
        return (
          <ScrollView
          refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
            {postsMarkup}
          </ScrollView>
        );
}

BooksScreen.propTypes = { 
    data:PropTypes.object.isRequired,
    getBookPosts:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data:state.data
})

const mapActionsToProps = {
    getBookPosts
}

export default connect(mapStateToProps,mapActionsToProps)(BooksScreen);

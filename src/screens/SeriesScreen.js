import * as React from 'react';
import { View, Text ,Button,ScrollView} from 'react-native';
import {logoutUser} from '../redux/actions/userActions'
import {getPosts} from '../redux/actions/dataActions'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import PostCard from '../components/PostCard';

function HomeScreen(props) {

  const getAllPosts = () => {
    props.getPosts()
  }

  //const [series,setSeries] = React.useState([])

  React.useState(() => {
    //console.log(props)
    getAllPosts()
  })

  const {posts,loading} = props.data
  //console.log(posts)

  let postsMarkup = !loading ? (
    posts.map(post => <PostCard post={post} key={post.post_id}/>)
  ) : (
    <Text>Loading</Text>
  )

    return (
      <ScrollView>
        {postsMarkup}
      </ScrollView>
    );
  }

HomeScreen.propTypes = { 
    data:PropTypes.object.isRequired,
    getPosts:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data:state.data
})

const mapActionsToProps = {
    getPosts
}

export default connect(mapStateToProps,mapActionsToProps)(HomeScreen);
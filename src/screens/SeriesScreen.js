import * as React from 'react';
import { View, Text ,Button,ScrollView,RefreshControl,Dimensions} from 'react-native';
import {logoutUser} from '../redux/actions/userActions'
import {getSeriesPosts} from '../redux/actions/dataActions'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import PostCard from '../components/PostCard';
import { Spinner } from '@ui-kitten/components';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native'
import {scrollToTop} from '../service'
import { TouchableOpacity } from 'react-native-gesture-handler';

function HomeScreen(props) {

  const height = Dimensions.get('window').height;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    props.getSeriesPosts()
    setRefreshing(false)
  },[refreshing])

  const navigation = useNavigation()

  const listRef = React.useRef(null)

  React.useEffect(() => {
    //console.log(props.data.loading)
    props.getSeriesPosts()
    if (listRef?.current) {
    scrollToTop(navigation, listRef);
    }
  },[])

  const {series,loading} = props.data

  let postsMarkup = !loading ? (
    series.map(post => <PostCard post={post} key={post.post_id} navigation={props.navigation}/> )
  ) : (
    <View style={{flex:1, justifyContent:'center' , alignItems:'center',marginTop:height/2 -45 }}>
    <Spinner size='giant' status='info' />
    </View>
  )

    return (
      <ScrollView style={{flex:1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ref={listRef}>
        {postsMarkup}
      </ScrollView>
    );
  }

HomeScreen.propTypes = { 
    data:PropTypes.object.isRequired,
    getSeriesPosts:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data:state.data
})

const mapActionsToProps = {
    getSeriesPosts
}

export default connect(mapStateToProps,mapActionsToProps)(HomeScreen);
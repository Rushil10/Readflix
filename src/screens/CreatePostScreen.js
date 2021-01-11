import { Avatar, Card, Spinner, Text ,Input,Calendar,Datepicker,Select,IndexPath,SelectItem,Button} from '@ui-kitten/components';
import * as React from 'react';
import { View,StyleSheet,Alert} from 'react-native';
import {post} from '../redux/actions/dataActions'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { useColorScheme } from 'react-native-appearance';

const data = [
    'series',
    'book'
]

function CreatePostScreen(props) {

    const {UI:{loading}} = props;

    const [name,setName] = React.useState('')
    const [review,setReview] = React.useState('')
    const [date, setDate] = React.useState(new Date())
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    const displayValue = data[selectedIndex.row];
    const now = new Date()
    const yesterday = new Date(now.getFullYear()-20, now.getMonth(), now.getDate() - 1);
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);

    console.log(date.toString())

    const makeAPost = (name,review,date,typeOfPost) => {
        const post={
            name:name,
            review:review,
            start_date:date.toISOString().slice(0, 19).replace('T', ' '),
            type:typeOfPost
        }
        if(name.length == 0){
            Alert.alert('Invalid Input','Name cannot be empty',[{text:'Okay'}]);
            return;
        } else if(review.length == 0){
            Alert.alert('Invalid Input','Review cannot be empty',[{text:'Okay'}]);
            return;
        } else {
            props.post(post)
            setName('')
            setReview('')
            setDate(new Date())
            Alert.alert('Posted',`${typeOfPost} has been Posted`,[{text:'Okay'}]);
        }
    }

    const Header = () => (
        <View style={styles.head}>
            <Avatar style={styles.photo} source={require('../profile_photo/new.jpg')} />
            <Text style={styles.user}>{username}</Text>
        </View>
    )

    const scheme = useColorScheme();
    let bgColor='white'
    let stat='info'
    {scheme === 'dark' ? stat='basic' : stat='info'}
    {scheme === 'dark' ? bgColor='#0F0F0F' : bgColor='white'}
    const {username} = props.user
    //console.log(props)
    return (
        <View>
            <Card status={stat} style={{backgroundColor:bgColor,borderRadius:15,marginTop:9,marginLeft:5,marginRight:5}} header={Header}>
            <Input status='info' autoCompleteType='off' style={styles.inputBox} size='large' placeholder='Name of Series/Book' value={name} onChangeText={newValue => setName(newValue)} />
            <Input status='info' autoCompleteType='off' style={styles.inputBox} size='large' placeholder='Review' value={review} onChangeText={newValue => setReview(newValue)} />
            <Datepicker
                placeholder='StartDate'
                style={styles.inputBox}
                size='large'
                status='info'
                min={yesterday}
                max={tomorrow}
                date={date}
                onSelect={nextDate => setDate(nextDate)}
            />
            <Select
                size='large'
                status='info'
                style={styles.inputBox}
                value={displayValue}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <SelectItem title='Series'/>
                <SelectItem title='Book'/>
            </Select>
            <Button onPress={() => makeAPost(name,review,date,displayValue)} style={styles.button} status='info'>{loading ? <Spinner status='basic' size='small'/> : 'Post'}</Button>
            </Card>
        </View>
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
    inputBox:{
        margin:3
    },
    button:{
        margin:3,
        marginTop:9,
        backgroundColor:'#1DA1F2'
    }
})

CreatePostScreen.propTypes = { 
    post:PropTypes.func.isRequired,
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
    post
}

export default connect(mapStateToProps,mapActionsToProps)(CreatePostScreen);
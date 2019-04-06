import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput,AppRegistry } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class AddBoardScreen extends Component {
  static navigationOptions = {
    title: 'Add Board',
  };

  constructor() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  super();
  this.ref = firebase.firestore().collection('boards');
  this.state = {
  title: '',
  description: '',
  author: '',
  isLoading: false,
  };
}
updateTextInput = (text,field) => {
  const state=this.state
  state[field]=text;
  this.setState(state);
}

saveBoard() {
  this.setState({
    isLoading:true,
  });
  this.ref.add({
    title:this.state.title,
    description:this.state.description,
    author:this.state.author,
  }).then((docRef) => {
    this.setState({
      title:'',
      description: '',
      author:'',
      isLoading:false,
    });
    this.props.navigation.goback();
  }).catch((error) => {
   console.error('Error adding document:',error);
   this.setState({
    isLoading:false,
   }); 
  });
}
  render() {
    if(this.state.isLoading) {
      return(
        <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff"/>
        </View>
        )
    }
    return(
    <ScrollView style={styles.container}>
    <View style={styles.subContainer}>
    <TextInput
    placeholder={'Title'}
    value={this.state.title}
    onChangeText={(text) => this.updateTextInput(text,'title')}
    />
    </View>
    <View style={styles.subContainer}>
    <TextInput
    multiline={true}
    numberofLines={4}
    placeholder={'Description'}
    value={this.state.description}
    onChangeText={(text) => this.updateTextInput(text,'description')}
    />
    </View>
    <View style={styles.subContainer}>
    <TextInput
    placeholder={'Author'}
    value={this.state.author}
    onChangeText={(text) => this.updateTextInput(text,'author')}
    />
    </View>
    <View style={styles.button}>
    <Button
    large
    leftIcon={{name:'save'}}
    title='Save'
    onPress={() => this.saveBoard()}/>
    </View>
    </ScrollView> 
    );
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

AppRegistry.registerComponent('firebasecrudnew',()=>AddBoardScreen);
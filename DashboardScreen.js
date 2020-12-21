import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';
import  CheckBox  from 'react-native-check-box';
import { Constants } from 'expo';
import AsyncStorage from '@react-native-community/async-storage';

class DashboardScreen extends React.Component {
  constructor() {
    super();
    this.state= {
      // store temp todo
      tempTodo:"",
      isChecked:false,
      data:[]
    }
  }
  
  saveData = async () => {
    console.log("Saving");
     try {
        await AsyncStorage.setItem('todos', JSON.stringify(this.state.data));

        console.log('Test', AsyncStorage.getItem('todos'));
        alert("Save is successful!");
      } catch (error) {
        console.log("Error saving")
      }
  }

  loadData = async () => {
    try {
    const value = await AsyncStorage.getItem('todos');
    if (value !== null) {
      console.log("Old data loaded")
      this.setState( {data: JSON.parse(value)})
    } 
   } catch (error) {
    //  alert("Problem retriving data");
   }
  }

  componentDidMount = () => {
    // initial load
    this.loadData();
  }

  addTodo = () => {
    let newTodo = {
      id: Math.random(1000000, 999999), // naive way of generating an unique
      title: this.state.tempTodo,
      done: false
    }

    this.setState({
      tempTodo: "", // reset temp todo to empty,
      data: [ ...this.state.data, newTodo]
    })

    Keyboard.dismiss();
  }

  deleteTodo = (item) => {
      // use find index to find the item to delete
      let index = this.state.data.findIndex((each) => {
        return each.id == item.id;  
      });

      let copy = [...this.state.data];
      copy.splice(index, 1);
      this.setState({
        data: copy
      });
  }

  toggleCheckbox = (currentItem) => {
    const todos = [...this.state.data];   

    // linear search to find the item to update
    let foundIndex = null;
    for (let i = 0; i < this.state.data.length; i++) {
      if (todos[i].id == currentItem.id) {
        foundIndex = i;
      }
    }         
    // if we found the item
    if (foundIndex != null) {
      // clone the todo
      const newTodo = {...currentItem};
      // inverse it's done status
      newTodo.done = !newTodo.done;

      todos[foundIndex]=newTodo;
    }


    // merge back into the state
    this.setState({
      data: todos
    })
  }

  renderListItem = (info) => {
    let currentItem = info.item
    return (
      <TouchableOpacity onPress={() => {this.props.navigation.navigate('Focus', {taskName: currentItem.title} )}}>
        <View style={ {flexDirection:"row", justifyContent:"flex-start", marginVertical: 5, backgroundColor: 'pink'}}>
          <CheckBox
            style={{ paddingTop: 6}}
            onClick={()=>{
            this.toggleCheckbox(currentItem);       
            }}
            isChecked={currentItem.done}     
          />
          <Text style={{paddingTop:9, paddingLeft:10, flex:1}}>{currentItem.title}</Text>
          <View style={{paddingTop:1}}>
            <Button title="Delete" onPress={() => {this.deleteTodo(currentItem)}}/ >        
          </View>
        
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}  behavior="padding" enabled>      
        
        <FlatList
          renderItem={this.renderListItem}
          data={this.state.data}
          keyExtractor={(item) => item.id}
        >
        </FlatList>
   
          <TextInput style={styles.textbox} 
              value={this.state.tempTodo} 
              onChangeText={ (text) => {this.setState({tempTodo:text})}} 
              placeholder={"Enter todo"}
          />
          
          <Button title="Add" onPress={ this.addTodo}/>
          <View style={{padding:5}}>
            <Button title="Save" onPress={ ()=>{this.saveData()}} />
          </View>
           <View style={{padding:5}}>
            <Button title="Load" onPress={ ()=>{this.loadData()}} />
          </View>
   
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  textbox: {    
    borderColor:'black',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 30,
    padding: 5
  },
});


export default DashboardScreen; 
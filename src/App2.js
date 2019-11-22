import React, { Component } from "react";
import axios from "axios";

const sha256 = require("js-sha256").sha256;

 export default class FetchExample extends React.Component {

 constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('"https://cors-anywhere.herokuapp.com/https://harbor.medhub.com/functions/api/schedules/shiftsSchedule"/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:{
        clientID: "10001",
        ts:  Date.now() / 1000,
        type: "json",
        request: {"programID":19,"startDate":"2016-07-01","endDate":"2016-12-31"},
        verify: sha256(`10001|${ts}|gdm00vtvqhw4|${request}`), 
      }})
        .then ((response) => response.json())
        .then ((responseJson) => {

          this.setState({
            isLoading: false,
            shifts: responseJson.shiftsSched,
          }, function(){

          });
        })
       .catch ((error)  =>{
      console.error(error);
  });
}
  render(){

    if(this.state.isLoading){
      return(
        <p>{shiftsSched}</p>
      )
    }

    /* return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );*/
  }
   
}
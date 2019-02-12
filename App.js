/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//import MapView from 'react-native-maps';
import {
  Platform,
  StyleSheet,
  Text,
  View,FlatList,Button,ScrollView,
} from 'react-native';
import io from 'socket.io-client';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      prevloc:null,
      lcount:0,
      Listit:[],
      socket:null,
    };
  }

componentDidMount()
{console.disableYellowBox = true;
  this.state.socket = io.connect('http://192.168.29.188:3030', {reconnect: true});
 
    
  console.log(this.state.socket );

}
  addList()
  {
    console.disableYellowBox = true;  
    setInterval(()=>
  {  
    //loc++
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          lcount: this.state.lcount+1,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    //
      if(this.state.prevloc!=this.state.latitude+','+this.state.longitude)
  
     {
        newList={key: this.state.latitude+','+this.state.longitude};
      this.setState({
          Listit:[...this.state.Listit,newList]
   
      })
      console.log('new');
    }
    else{console.log('done');}
      this.setState({prevloc:this.state.latitude+','+this.state.longitude})
      this.state.socket.emit('app',this.state.prevloc);


      
  },30000);
}

print()
{
  this.state.socket.emit('app','192');
// this.state.socket.on('get app',function(data)
// {
//   console.log(data);
// });
}

  

  render() {
    return (
   

      <View style={{flex:1}}>
        <View style={{flex:8,}}>
        <ScrollView >
        <FlatList
        inverted
        data={this.state.Listit}
        renderItem={({item}) => 
        <Text onPress={() =>console.log(item.key)}
         style={styles.list} >
        {item.key}</Text>}
       // showsVerticalScrollIndicator={true}
       refreshing={true}
       />

</ScrollView>
</View>
<View style={{flex:1,}}>
<Button onPress={this.addList.bind(this)} title='Scan Location' >
  </Button>
  <Button onPress={this.print.bind(this)} title='net' >
  </Button>
</View>
 
  
  
  
      </View>

    );
  }
}

const styles = StyleSheet.create({
  list:{borderColor:'#6495ED',borderWidth:2,
  height:30,paddingLeft:10
  
},

});

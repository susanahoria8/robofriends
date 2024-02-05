import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';



class App extends Component {
  constructor(){
    super()
    this.state ={
      robots: [],
      searchfield:''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> {
        return response.json();
      })
      .then(users => {
        this.setState({robots: users})
      });
  }
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value})  
  }

  render(){
    const filteredRobots= this.state.robots.filter(robot=>{
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    if (this.state.robots.length === 0){
      return <h1 className='tc pa2'>Loading</h1>
    } else {
      return (
        <div className='tc'>
          <div>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
          </div>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div> 
      );
    }     
  }
}

export default App;

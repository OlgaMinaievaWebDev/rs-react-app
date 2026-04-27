import React from 'react';
import { Search } from './components/Search';
import { Results } from './components/Results';
import './App.css';
class App extends React.Component {
  render() {
    return (
      <>
        <Search />
        <Results />
      </>
    );
  }
}

export default App;

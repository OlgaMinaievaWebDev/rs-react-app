import React from 'react';
import { Search } from './components/Search';
import { Results } from './components/Results';
import './App.css';

interface AppState {
  search: string;
}
class App extends React.Component<object, AppState> {
  state = {
    search: '',
  };

  componentDidMount(): void {
    const savedInput = localStorage.getItem('input');
    if (savedInput !== null) {
      this.setState({
        search: savedInput,
      });
    }
  }

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSearchClick = () => {
    const trimmed = this.state.search.trim();
    if (trimmed !== localStorage.getItem('input')) {
      this.setState({
        search: trimmed,
      });
      localStorage.setItem('input', trimmed);
    }
  };

  render() {
    return (
      <>
        <Search
          value={this.state.search}
          onChange={this.handleSearch}
          onSearch={this.handleSearchClick}
        />
        <Results />
      </>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';
import Routes from './components/Routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Routes history={this.props.history} />
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;

// ReactDOM.render( <div>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </div>,
//   document.getElementById('root')
// );
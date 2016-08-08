import React from 'react';
var $ = window.$;

class App extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav();
  }

  render() {
    return (
       <nav>
         <div className="nav-wrapper teal darken-3">
           <a href="#!" className="brand-logo">My App</a>
           <a href="#" data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>
           <ul className="right hide-on-med-and-down">
             {/*Add full screen navs here */}
           </ul>
           <ul className="side-nav" id="mobile-nav">
             {/*Add mobile navs here */}
           </ul>
         </div>
       </nav>
    )
  }
}

export default App;

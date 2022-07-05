import Homepage from './page/Homepage';
import Showpage from './page/Showpage';
import {Route, Switch, Redirect} from 'react-router-dom'
function App() {
  return (
    // <Switch>
    //   <Route path="/homepage" component={Homepage} />
    //   <Redirect to="/homepage"/>
    // </Switch>
    <Switch>
      <Route path="/showpage" component={Showpage} />
      <Redirect to="/showpage"/>
    </Switch>

  );
}
export default App;
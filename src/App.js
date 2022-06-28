import Homepage from './page/Homepage';
import {Route, Switch, Redirect} from 'react-router-dom'
function App() {
  return (
    <Switch>
      <Route path="/homepage" component={Homepage} />
      <Redirect to="/homepage"/>
    </Switch>
  );
}
export default App;
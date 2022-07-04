import Homepage from './page/Homepage';
import Searchlist from './page/Searchlist';
import {Route, Switch, Redirect} from 'react-router-dom'
function App() {
  return (
    <Switch>
      <Route path="/homepage" component={Homepage} />
      <Route path="/searchlist" component={Searchlist}/>
      <Redirect to="/homepage"/>
    </Switch>
  );
}
export default App;
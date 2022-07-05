import Homepage from './page/Homepage';
import Searchlist from './page/Searchlist';
import Showpage from './page/Showpage';
import {Route, Switch, Redirect} from 'react-router-dom'
function App() {
  return (
    <Switch>
      <Route path="/homepage" component={Homepage} />
      <Route path="/searchlist" component={Searchlist}/>
      <Route path="/showpage" component={Showpage} />
      <Redirect to="/homepage"/>
    </Switch>
  );
}
export default App;
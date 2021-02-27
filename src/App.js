import Questions from './components/QuestionsPage/Questions';
import QuestionCard from './components/QuestionsPage/QuestionCard';
import Demo from './components/QuestionsPage/Datatable/demo.js';
import Home from './components/homepage/home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Rules from './components/RulesPage/Rules'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/play">
            <Questions/>
        </Route>
        <Route path="/rules">
          <Rules />
          </Route>
        <Route path="/card">
            <QuestionCard questiontitle='Try' question="try try" image="https://6jlvz1j5q3.csb.app/undraw_static_assets.svg" ans="A"/>
        </Route >
        <Route path="/board">
            <Demo/>
        </Route>
     </Switch>
     </Router>
  );
}

export default App;

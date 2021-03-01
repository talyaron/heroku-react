import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom";

export default function App() {

  const [counter, setCounter] = useState(1);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users counter={counter} setCounter={setCounter}/>
          </Route>
          <Route path="/user/:id">
            <User />
          </Route>
          <Route path="/">
            <Home counter={counter} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home({counter}) {
  return (
    <div>
      <h2>Home</h2>
      <h3>number of users: {counter}</h3>
      <Link to='/about'>About</Link>
      <br />
      <a href='/about'>About 2</a>
    </div>);
}

function About() {
  const history = useHistory();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        history.push(`/user/${json.userId}`)
      })
  }, [])
  return <h2>About</h2>;
}

function Users({counter,setCounter}) {
  
  function handleCounter(){
    setCounter(counter+1);
  }
  return (
    <div>
      <h2>Users {counter}</h2>
      <button onClick={handleCounter}>Add</button>
    </div>
  );
}

function User(props) {
  let { id } = useParams();
  return <h2>User:{id}</h2>;
}


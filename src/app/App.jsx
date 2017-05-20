import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router-dom';
import {DefaultRoute, Route, Router ,IndexRoute} from 'react-router';
import {render} from 'react-dom';

import {DefaultLayout} from './components/layouts/Default.jsx';
import {HomePage} from './pages/Home.jsx';
import {TodosPage} from './pages/Todos.jsx';
import { TodoList} from './components/todo/List.jsx';
import {TodoDetails} from './components/todo/Details.jsx';
import {TodoEdit} from './components/todo/Edit.jsx';
import {ErrorPage} from './pages/Error.jsx';

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

render((    	
	   <TodoList />		
   ), document.getElementById('myApp'));



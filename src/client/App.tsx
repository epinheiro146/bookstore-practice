import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './utils/Navbar';
import PrivateRoute from './utils/PrivateRoute';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Books from './views/Books';
import New from './views/New';
import BookDetails from './views/BookDetails';
import Update from './views/Update';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/books' element={<Books />} />
					<Route path='/books/new' element={<PrivateRoute><New /></PrivateRoute>} />
					<Route path='/books/:id/update' element={<PrivateRoute><Update /></PrivateRoute>} />
					<Route path='/books/:id' element={<BookDetails />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App;

import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import RQSuperHeroesPage from './pages/rqSuperHeroes'
import SuperHeroesPage from './pages/superHeroes'

const App = () => {

	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/superheroes' element={<SuperHeroesPage />} />
				<Route path='/rq-superheroes' element={<RQSuperHeroesPage />} />
			</Routes>
		</>
	)
}
export default App

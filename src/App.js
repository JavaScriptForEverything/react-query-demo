import { Route, Routes } from 'react-router-dom'

import { Home, Superheroes, RQSuperheroes, RQSuperhero, ParallelQuery } from './pages'

const App = () => {

	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/superheroes' element={<Superheroes />} />
				<Route path='/rq-superheroes' element={<RQSuperheroes />} />
				<Route path='/rq-superheroes/:heroId' element={<RQSuperhero />} />
				<Route path='/parallel-query' element={<ParallelQuery userId='vishwas@example.com' />} />
			</Routes>
		</>
	)
}
export default App

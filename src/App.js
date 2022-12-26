import { Route, Routes } from 'react-router-dom'

import { Home, Superheroes, RQSuperheroes, RQSuperhero, ParallelQuery, DependentQuery, Paginated } from './pages'

const App = () => {

	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/superheroes' element={<Superheroes />} />
				<Route path='/rq-superheroes' element={<RQSuperheroes />} />
				<Route path='/rq-superheroes/:heroId' element={<RQSuperhero />} />
				<Route path='/parallel-query' element={<ParallelQuery heroIds={[1, 3]} />} />
				<Route path='/dependent-query' element={<DependentQuery userId='vishwas@example.com' />} />
				<Route path='/paginated' element={<Paginated />} />
			</Routes>
		</>
	)
}
export default App

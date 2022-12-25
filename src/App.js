import { Route, Routes } from 'react-router-dom'

import { Home, Superheroes, RQSuperheroes, RQSuperhero } from './pages'

const App = () => {

	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/superheroes' element={<Superheroes />} />
				<Route path='/rq-superheroes' element={<RQSuperheroes />} />
				<Route path='/rq-superheroes/:heroId' element={<RQSuperhero />} />
			</Routes>
		</>
	)
}
export default App

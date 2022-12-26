import axios from 'axios'
import { useQueries } from 'react-query'
import Layout from '../layout'

const getSuperheroById = ({ queryKey }) => {
	const heroId = queryKey[1]
	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
}

export const ParallelQuery = ({ heroIds }) => {
	const superheroes = useQueries(
		heroIds.map(id => ({ 
			queryKey: ['superheroes', id],
			queryFn: getSuperheroById,
		}))
	)

	// console.log(superheroes[0].data?.data)

	return (
		<Layout>
			<h2>Parallel Query</h2>

			<pre>
				{JSON.stringify(superheroes[0].data?.data, null, 2)}
			</pre>

			<pre>
				{JSON.stringify(superheroes[1].data?.data, null, 2)}
			</pre>

			<pre>
				{superheroes.map(hero => JSON.stringify(hero.data?.data, null, 2) )}
			</pre>
		</Layout>
	)
}

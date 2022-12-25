import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '../layout'

const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes')
	
const RQSuperHeroesPage = () => { 			// 	(2)
	const { isLoading, data, isError, error, refetch } = useQuery('superheroes-key', getSuperHeroes, {
		enabled: false, 	// step-1. disable auto fetch on mount
	})


	if(isLoading) return <p>Loading...</p>
	if(isError) return <p>{error.message}</p>

	return (
		<Layout>
			<p>React Query Superheroes</p>
			<button onClick={refetch}>Fetch Superheroes</button>
							{/* (3) */}

			<pre>
				{JSON.stringify(data?.data, null, 2)}
			</pre>
		</Layout>
	)
}
export default RQSuperHeroesPage

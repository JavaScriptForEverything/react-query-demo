import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '../layout'

const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes')
	
const RQSuperHeroesPage = () => {
	const { isLoading, data, isError, error } = useQuery('superheroes-key', getSuperHeroes, {
		// cacheTime: 1000 * 60 * 5, 		// Refetch after given time in background
		// staleTime: 1000 * 30, 				// it prevent fetch immediately, face after 30 sec.
		// refetchOnMount: true,
		// refetchInterval: 2000

	})


	if(isLoading) return <p>Loading...</p>
	if(isError) return <p>{error.message}</p>

	return (
		<Layout>
			<p>React Query Superheroes</p>

			<pre>
				{JSON.stringify(data?.data, null, 2)}
			</pre>
		</Layout>
	)
}
export default RQSuperHeroesPage

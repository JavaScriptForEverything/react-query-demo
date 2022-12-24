import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '../layout'

const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes')
	
const RQSuperHeroesPage = () => {
	const { isLoading, data, isError, error } = useQuery('superheroes-key', getSuperHeroes)

	if(isLoading) return <p>Loading...</p>
	if(isError) return <p>{error.message}</p>

	return (
		<Layout>
			<p>React Query Superheroes</p>

			<pre>
				{JSON.stringify(data.data, null, 2)}
			</pre>
		</Layout>
	)
}
export default RQSuperHeroesPage

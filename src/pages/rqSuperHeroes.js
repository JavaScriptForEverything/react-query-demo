import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '../layout'

// step-3: make success request with valid url, and failed with invalid url
const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes')
// const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes1')
	
const RQSuperHeroesPage = () => { 

	// step-1: Define onError and onSuccess handler
	const onSuccess = (data) => console.log(data)
	const onError = (error) => console.log(error)

	const { isLoading, data, isError, error } = useQuery('superheroes-key', getSuperHeroes, {
		// step-2: add onError and onSuccess handler
		onSuccess,
		onError
	})

	if(isLoading) return <Layout> <p>Loading...</p> </Layout>
	if(isError) return <Layout> <p>{error.message}</p> </Layout>

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

import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '../layout'

const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes')
	
const RQSuperHeroesPage = () => { 


	const { isLoading, data: superheroes, isError, error } = useQuery('superheroes-key', getSuperHeroes, {
		select: (data) => {
			const superheroes = data?.data.map(superhero => superhero.name)
			return superheroes
		}
	})

	if(isLoading) return <Layout> <p>Loading...</p> </Layout>
	if(isError) return <Layout> <p>{error.message}</p> </Layout>

	return (
		<Layout>
			<p>React Query Superheroes</p>

			<ul>
				{superheroes.map(superhero => <li key={superhero}>{superhero}</li>)}
			</ul>

			<pre>
				{JSON.stringify(superheroes, null, 2)}
			</pre>
		</Layout>
	)
}
export default RQSuperHeroesPage

import { Link } from 'react-router-dom'
import { useSuperheores } from '../hooks'
import Layout from '../layout'

	
export const RQSuperheroes = () => { 

	const onSuccess = (data) => console.log(data)
	const onError = (error) => console.log(error)

	const { isLoading, data: superheroes, isError, error } = useSuperheores({ onSuccess, onError })

	if(isLoading) return <Layout> <p>Loading...</p> </Layout>
	if(isError) return <Layout> <p>{error.message}</p> </Layout>

	return (
		<Layout>
			<p>React Query Superheroes</p>

			<ul>
				{superheroes.map(hero => <li key={hero.id}>
					<Link to={`/rq-superheroes/${hero.id}`}>
					{hero.name}
					</Link>
				</li>)}
			</ul>

			<pre>
				{JSON.stringify(superheroes, null, 2)}
			</pre>
		</Layout>
	)
}

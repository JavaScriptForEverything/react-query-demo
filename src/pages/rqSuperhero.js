import { useParams } from 'react-router-dom'
import { useSuperhero } from '../hooks'
import Layout from '../layout'


export const RQSuperhero = () => {
	const { heroId } = useParams()
	const { data, isLoading, isError, error } = useSuperhero(heroId)

	if(isLoading) return <Layout><h2>Loading...</h2></Layout>
	if(isError) return <Layout><h2>{error.message}</h2></Layout>

	return (
		<Layout>
			<p>Superhero Details: {heroId}</p>

			<pre>
				{JSON.stringify(data?.data, null, 2)}
			</pre>
		</Layout>
	)
}

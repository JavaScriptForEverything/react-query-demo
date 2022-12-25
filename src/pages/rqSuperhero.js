import { useParams } from 'react-router-dom'
import { useSuperhero } from '../hooks'
import Layout from '../layout'


export const RQSuperhero = () => {
	const { heroId } = useParams()
	const { data } = useSuperhero(heroId)

	return (
		<Layout>
			<p>Superhero Details: {heroId}</p>

			<pre>
				{JSON.stringify(data?.data, null, 2)}
			</pre>
		</Layout>
	)
}

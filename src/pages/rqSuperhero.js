import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Layout from '../layout'

// method-1
// const getHeroById = (heroId) => {
// 	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
// }

// method-2: get heroId from queryKey's 2nd item
const getHeroById = ({ queryKey }) => {
	const heroId = queryKey[1] 	// because we pass as 2nd item in ['hero-detials', heroId ]
	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
}

export const RQSuperhero = () => {
	const { heroId } = useParams()

	// // method-1
	// const { data } = useQuery(`hero-${heroId}`, () => getHeroById(heroId))

	// method-2: We pass the id as second argument in `queryKey`
	const { data } = useQuery(['hero-details', heroId], getHeroById)

	return (
		<Layout>
			<p>Superhero Details: {heroId}</p>

			<pre>
				{JSON.stringify(data?.data, null, 2)}
			</pre>
		</Layout>
	)
}

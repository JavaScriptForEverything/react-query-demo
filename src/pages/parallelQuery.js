import axios from 'axios'
import { useQuery } from 'react-query'

const getSuperheroes = () => {
	return axios.get('http://localhost:5000/superheroes')
}
const getFriends = () => {
	return axios.get('http://localhost:5000/friends')
}

export const ParallelQuery = () => {
	const { data: superheroes} = useQuery('super-heroes' , getSuperheroes)
	const { data: friends } = useQuery('friends' , getFriends)

	return (
		<>
			<h2>Parallel Query</h2>

			<pre>
				{JSON.stringify(superheroes?.data, null, 2)}
			</pre>
			<pre>
				{JSON.stringify(friends?.data, null, 2)}
			</pre>
		</>
	)
}

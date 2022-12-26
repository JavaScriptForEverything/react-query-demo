import { useQuery } from 'react-query'
import Layout from '../layout'
import axios from 'axios'
import { useState } from 'react'

const getColors = ({ queryKey }) => {
	const page = queryKey[1]
	return axios.get(`http://localhost:5000/colors?_limit=2&_page=${page}`)
}

export const Paginated = () => {
	const [ page, setPage ] = useState(1)
	const { isLoading, data: colors, isError, error, isFetching } = useQuery(['colors', page ], getColors, {
		keepPreviousData: true
	})

	if(isLoading) return <Layout> <p>Loading...</p> </Layout>
	if(isError) return <Layout> <p>{error.message}</p> </Layout>

	return (
		<Layout>
			<h2>Pagination: {isFetching && 'loading...'}</h2>

				{colors?.data.map(hero => <h4 key={hero.id}>
					{hero.id}. {hero.label}
				</h4>)}

			<button onClick={() => setPage(page - 1)}>Prev Page</button>
			<button onClick={() => setPage(page + 1)}>Next Page</button>
		</Layout>
	)
}

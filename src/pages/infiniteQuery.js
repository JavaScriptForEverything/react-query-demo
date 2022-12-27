import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import Layout from '../layout'

const getColors = ({ pageParams = 1 }) => {
	return axios.get(`http://localhost:5000/colors?_limit=2&_page=${pageParams}`)
}

export const InfiniteQuery = () => {
	const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery('colors', getColors, {
		getNextPageParam: (_lastPage, allPages) => {
			const totalPage = 4 
			if(allPages.length < totalPage) {
				// problem: return value not update the: { pageParams } in the callback
				return allPages.length + 1
			} else {
				return undefined 		// not false, else not hasNextPage won't false
			}
		},
	})


	if(isLoading) return <Layout>loading ...</Layout>
	if(isError) return <Layout>{error.message}</Layout>

	return (
		<Layout>
			<h2>Infinite Query </h2>
			<code>
				Problem: why not updated: {JSON.stringify({ pageParams: 1 })} in getNextPageParam.
				actually return value not passed to 'getColors' callback
			</code>

			{data?.pages.map((group, index) => (
				<div key={index}>
					{group?.data?.map(color => (
						<p key={color.id}>{color.id}. {color.label}</p>
					))}
				</div>
			))}

			<button disabled={!hasNextPage} onClick={fetchNextPage}>Load more</button>
		</Layout>
	)
}

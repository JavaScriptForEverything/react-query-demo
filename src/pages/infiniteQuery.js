import { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

import Layout from '../layout'

const getColors = ({ pageParam = 1 }) => {
	return axios.get(`http://localhost:5000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQuery = () => {

	const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery('colors', getColors, {
		getNextPageParam: (_lastPage, allPages) => {
			const totalPage = 4 
			return allPages.length < totalPage ? allPages.length + 1 : undefined
			// Note: return undefined, not false, to make hasNextPage false
		},
	})


	useEffect(() => {
		const scrollHandler = async (evt) => {
			const { scrollHeight, scrollTop, clientHeight } = evt.target.scrollingElement

			if(scrollHeight - scrollTop <= clientHeight ) {
				console.log('fetch')
				await fetchNextPage()
			}
		}
		document.addEventListener('scroll', scrollHandler)
		return () => document.removeEventListener('scroll', scrollHandler)
	}, [fetchNextPage])


	if(isLoading) return <Layout>loading ...</Layout>
	if(isError) return <Layout>{error.message}</Layout>

	return (
		<Layout>
			<h2>Infinite Query </h2>

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

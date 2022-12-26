import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '../layout'

const getUserById = ({ queryKey }) => {
	const userId = queryKey[1]
	return axios.get(`http://localhost:5000/users/${userId}`)
}
const getChannelById = ({ queryKey }) => {
	const channelId = queryKey[1]
	return axios.get(`http://localhost:5000/channels/${channelId}`)
}

export const DependentQuery = ({ userId }) => {
	const { data: user } = useQuery(['user-query', userId], getUserById)
	const channelId = user?.data.channelId

	const { data: channel } = useQuery(['channel', channelId], getChannelById, {
		enabled: !!channelId 	// only call query when channelId available
	})

	return (
		<Layout>
			<h2>Dependent Query</h2>

			<pre>
				{JSON.stringify(user?.data, null, 2)}
			</pre>
			<pre>
				{JSON.stringify(channel?.data, null, 2)}
			</pre>
			
		</Layout>
	)
}

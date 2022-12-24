import axios from 'axios'
import { useEffect, useState } from 'react'
import Layout from '../layout'

const SuperHeroesPage = () => {
	const [ superheroes, setSuperheroes ] = useState([])
	const [ loading, setLoading ] = useState(false)
	const [ error, setError ] = useState('')

	const getSuperHeroes = async() => {
		try {
			setLoading(true)
			// setTimeout(async () => {
				const { data } = await axios.get('http://localhost:5000/superheroes')
				setSuperheroes(data)
				setLoading(false)
			// }, 1000);

		} catch (error) {
			console.log(error.response)
			setError(error.message)
			setLoading(false)
		}
	}

	useEffect(() => {
		getSuperHeroes()
	}, [])

	// console.log({ loading, error })

	if(loading) return <Layout> <p>Loading...</p> </Layout>
	if(error) return <Layout> <p>{error}</p> </Layout>

	return (
		<Layout>
			<p>Super Heroes</p>

			<pre>
				{JSON.stringify(superheroes, null, 2)}
			</pre>
		</Layout>
	)
}
export default SuperHeroesPage

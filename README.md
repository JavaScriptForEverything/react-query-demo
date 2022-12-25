# Understanding React-Query

Why we prefare `React-Query` over taditional `fetch` or `axios` library ?
	- Because only `fetch` or `axios` allow to fetch data, but `react-query` allows
	additional features like:

		. Memory Cache
		. Custom Hook (reduce so many boiler code)
		. ...


##### Fetching Data 
```
import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '../layout'

const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes')
	
const RQSuperHeroesPage = () => { 

	const { isLoading, data, isError, error } = useQuery('superheroes-key', getSuperHeroes )

	if(isLoading) return <Layout> <p>Loading...</p> </Layout>
	if(isError) return <Layout> <p>{error.message}</p> </Layout>

	return (
		<Layout>
			<p>React Query Superheroes</p>

			<pre>
				{JSON.stringify(data?.data, null, 2)}
			</pre>
		</Layout>
	)
}
export default RQSuperHeroesPage
```



##### Fetching Data on Event
Make Sure remove cache: `Ctrl + F5` will refresh page and remove 

```
import axios from 'axios'
import { useQuery } from 'react-query'
import Layout from '../layout'

const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes')
	
const RQSuperHeroesPage = () => { 

	const { data, refetch } = useQuery('superheroes-key', getSuperHeroes, {
		enabled: false, 		// step-1: prevent auto fetch on mont
	})

	return (
		<>
			<p>React Query Superheroes</p>
			<button onClick={refetch}>Fetch Superheroes</button>

			<pre>
				{JSON.stringify(data?.data, null, 2)}
			</pre>
		</>
	)
}
export default RQSuperHeroesPage
```



##### Handling Side Effect
```
import axios from 'axios'
import { useQuery } from 'react-query'

const callback = async() => axios.get('http://localhost:5000/superheroes')
// const callback = async() => axios.get('http://localhost:5000/superheroes1')
	
const onSuccess = (data) => console.log(data)
const onError = (error) => console.log(error)

const { data } = useQuery('key', callback, { onSuccess, onError })
```
# Understanding React-Query

<p align="center">
	<img
		width="200px"
		src="https://github.com/JavaScriptForEverything/react-query-demo/blob/master/public/react-query.svg"
		alt="/public/react-query.svg"
	/>
</p>




Why we prefare `React-Query` over taditional `fetch` or `axios` library ?
	- Because only `fetch` or `axios` allow to fetch data, but `react-query` allows
	additional features like:

		. Memory Cache
		. Custom Hook (reduce so many boiler code)
		. ...

#### How to use this project:
	. clone the repo: `git clone https://github.com/JavaScriptForEverything/react-query-demo`
	. start server in one terminal and client in other terminal

```
$ git clone https://github.com/JavaScriptForEverything/react-query-demo

$ cd react-query-demo
$ yarn install
$ yarn server 				: terminal-1: for server on localhost:5000
$ yarn start 				: terminal-2: for client on localhost:3000
```

#### How to read (any) project:
	. go to  `https://github.com/JavaScriptForEverything/react-query-demo`
	. click on `n commits` link on top right of the file explorer
	. go very end of lists, (first commit is the last item in explorer, or `$ git log --oneline`)


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

##### Data Transformation: (filtering, sorting, maping,....)
Sometime we need to transform or reformat data in our frontend code.
so let's see how we can do that by `react-query`

```
import axios from 'axios'
import { useQuery } from 'react-query'

const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes')
	
const RQSuperHeroesPage = () => { 

	// Step-2: Re-name the `data` variable, because it is now an array of names
	const { data: superheroes } = useQuery('superheroes-key', getSuperHeroes, {

		// Step-1: Re-map or re-format data object, returns array of users
		select: (data) => {
			const superheroes = data?.data.map(superhero => superhero.name)
			return superheroes
		}
	})

	return (
		<Layout>
			<p>React Query Superheroes</p>

			{/* Step-3: Read filtered/formated array  */}
			<ul>
				{superheroes.map(superhero => <li key={superhero}>{superhero}</li>)}
			</ul>

			<pre>
				{JSON.stringify(superheroes, null, 2)}
			</pre>
		</Layout>
	)
}
export default RQSuperHeroesPage
```



##### Custom Hooks
Why we need custom hooks ?
	- When we need same logic in multiple page we can use custom hook instead of duplicating code.
	- Creating Custom hooks for the `Data Transformation` Example

###### /pages/rqSuperHeroes.js
```
import { useSuperheores } from '../hooks'
import Layout from '../layout'
	
const RQSuperHeroesPage = () => { 

	const onSuccess = (data) => console.log(data)
	const onError = (error) => console.log(error)

	const { isLoading, data: superheroes, isError, error } = useSuperheores({ onSuccess, onError })

	if(isLoading) return <Layout> <p>Loading...</p> </Layout>
	if(isError) return <Layout> <p>{error.message}</p> </Layout>

	return (
		<Layout>
			<p>React Query Superheroes</p>

			<ul>
				{superheroes.map(superhero => <li key={superhero}>{superhero}</li>)}
			</ul>

			<pre>
				{JSON.stringify(superheroes, null, 2)}
			</pre>
		</Layout>
	)
}
export default RQSuperHeroesPage
```

###### /hooks/index.js
```
export * from './useSuperheroes'
```

###### /hooks/useSuperheroes.js
```
import axios from 'axios'
import { useQuery } from 'react-query'

const getSuperHeroes = async() => axios.get('http://localhost:5000/superheroes')

export const useSuperheores = ({ onSuccess, onError }) => {
	return useQuery('superheroes-key', getSuperHeroes, {
		onSuccess,
		onError,
		select: (data) => {
			const superheroes = data?.data.map(superhero => superhero.name)
			return superheroes
		}
	})
}
```




##### Fetch By Id
Method-1: Regular way

```
import { useParams } from 'react-router-dom'
const { heroId } = useParams()

const getHeroById = (heroId) => {
	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
}
const { data } = useQuery(`hero-${heroId}`, () => getHeroById(heroId))
```


Method-2: We pass the id as second argument in `queryKey`

```
import { useParams } from 'react-router-dom'
const { heroId } = useParams()

// method-2: get heroId from queryKey's 2nd item
const getHeroById = ({ queryKey }) => {
	const heroId = queryKey[1] 
	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
}

// pass id as 2nd item of `queryKey`, which will be accessable as params
const { data } = useQuery(['hero-details', heroId], getHeroById)
```


###### Example: /pages/rqSuperhero.js
```
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
```


##### Example-By-hooks:

###### /pages/rqSuperhero.js
```
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
```


###### /hooks/useSuperhero.js
```
import axios from 'axios'
import { useQuery } from 'react-query'

// method-1
// const getHeroById = (heroId) => {
// 	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
// }

// export const useSuperhero = (heroId) => {
// 	return useQuery(`hero-details-${heroId}`, () => getHeroById(heroId))
// }


// method-2: get heroId from queryKey's 2nd item
const getHeroById = ({ queryKey }) => {
	const heroId = queryKey[1] 	// because we pass as 2nd item in ['hero-detials', heroId ]
	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
}

export const useSuperhero = (heroId) => {
	return useQuery(['hero-details', heroId], getHeroById)
}
```



##### Parallel Queries
If we need multiple requests, then do the same way

###### /pages/parallelQuery.js
```
const getSuperheroes = () => {
	return axios.get('http://localhost:5000/superheroes')
}
const getFriends = () => {
	return axios.get('http://localhost:5000/friends')
}

const { data: superheroes} = useQuery('super-heroes' , getSuperheroes)
const { data: friends } = useQuery('friends' , getFriends)

<pre>
	{JSON.stringify(superheroes?.data, null, 2)}
</pre>
<pre>
	{JSON.stringify(friends?.data, null, 2)}
</pre>
```

##### Parallel Queries Dynamically
Suppose we we have a list of heroes IDs, which is an array, and we don't know how many
IDs will be inside that array. How do we query for array. We can use loop, right ?

But the problems is that `useQuery` is a hooks, and hooks can't be nested inside any
block, but here to use hooks we violate the roles of hooks. Which is not allowed.

How do we solve this problems ?
	- To solve this problems `useQueries` hooks comes into picture.

```
const heroes = useQueries(heroIds.map(heroId => ({
	queryKey: [ 'superhero', heroId ],
	queryFn: getHeroById
})))

const getHeroById = ({ queryKey }) => {
	const heroId = queryKey[1] 	// comes from 2nd argument of the `queryKey`
	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
}
```


###### Example: /pages/parallelQuery.js
```
import axios from 'axios'
import { useQueries } from 'react-query'

const getSuperheroById = ({ queryKey }) => {
	const heroId = queryKey[1]
	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
}

export const ParallelQuery = ({ heroIds }) => {
	const superheroes = useQueries( heroIds.map(id => ({ 
		queryKey: ['superheroes', id],
		queryFn: getSuperheroById
	})))

	return (
		<>
			<h2>Parallel Query</h2>

			<pre>
				{JSON.stringify(superheroes[0].data?.data, null, 2)}
			</pre>

			<pre>
				{JSON.stringify(superheroes[1].data?.data, null, 2)}
			</pre>

			<pre>
				{superheroes.map(hero => JSON.stringify(hero.data?.data, null, 2) )}
			</pre>
		</>
	)
}
```



##### Dependent Parallel Queries 
Here we need 2 quires, 2nd one depends on 1st one.
Here happends 2 things:
	1. Query are promised so we can't be sure which one resolve first
	2. Promise take some times to resolve.

So our 2nd query must be called when 1st query resolved and wait until promise fullfilled

```
// Step-1: called immediately
const { data: user } = useQuery(['user-query', userId], getUserById)

// Step-2: value will be null at first time then after fullfilled get value
const channelId = user?.data.channelId

const { data: channel } = useQuery(['channel', channelId], getChannelById, {
	// Step-3: only call query when channelId available
	enabled: !!channelId 	
})
```


###### Example: /pages/dependentQuery.js
```
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
```

##### Show InitialData instead of loading
When we try to fetch data we have `isLoading` property to show loading while data fetching.
But when we try to get complete data on `dynamic route`, like getHeroDetailsById, ... 	
we already have total `superheroes` right ? 

so in details page, instead of showing loading, we can show the data we fetched earlier, while 
fetching details data, and when details data fetched that that data replace the old data.

This way 'user seams that data shows immediately' but we knows that user sees the old data, instead
of loading, and when loading complete the real data replace the UI in a blink, user may not notice
at all. Let's see the code.	


###### Example: /hooks/useSuperhero.js
```
import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'

const getHeroById = ({ queryKey }) => {
	const heroId = queryKey[1] 	// because we pass as 2nd item in ['hero-detials', heroId ]
	return axios.get(`http://localhost:5000/superheroes/${heroId}`)
}

export const useSuperhero = (heroId) => {
	const client = useQueryClient() 	// access the const client = new QueryClient()

	return useQuery(['hero-details', heroId], getHeroById, {
		initialData: () => {
			// same key used in getAllSuperheroes queryKey used
			const hero = client.getQueryData('superheroes-key')?.data?.find(hero => hero.id === +heroId)

			return hero 
				? { data: hero } // return as property of data, because we used: data.data.hero.name
				: undefined 	// undefined means fetch, instead to try to read from cache
		}
	})
}
```
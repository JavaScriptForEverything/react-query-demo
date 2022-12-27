import axios from 'axios'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const getSuperheroes = () => {
	return axios.get('http://localhost:5000/superheroes')
}
const addSuperhero = (data) => {
	return axios.post('http://localhost:5000/superheroes', data)
}

export const AddHero = () => {
	const queryClient = useQueryClient()

	const [ fields, setFields ] = useState({ name: '', alterEgo: '' })
	const { data: superheroes, refetch } = useQuery('superheroes', getSuperheroes, {
		enabled: false 															//		(1)
	})
	const { mutate: addHero } = useMutation(addSuperhero, {
		onSuccess: ( data ) => {  // 	(2)
			queryClient.setQueryData('superheroes', (oldQueryData) => ({
					...oldQueryData,
					data: [ ...oldQueryData.data, data.data]
			})) 		
		}
	})

	const changeHandler = (evt) => setFields({ ...fields, [evt.target.name]: evt.target.value })
	
	const submitHandler = () => {
		if(!fields.name.trim()) return alert('Add Name')

		addHero(fields)

		setFields({ name: '', alterEgo: '' }) // empty form
	}

	return (
		<>
			<h2>Add Hero</h2>
			<br /> <br />

			<input name='name' value={fields.name} onChange={changeHandler} />
			<input name='alterEgo' value={fields.alterEgo} onChange={changeHandler} />
			<button onClick={submitHandler}>Add Hero</button>
			<br /> <br />

			<button onClick={refetch}>Fetch Heroes</button>

			<ul>
				{superheroes?.data?.map(hero => (
					<li key={hero.id}>{hero.id}.{hero.name} =&gt; {hero.alterEgo}</li>
				))}
			</ul>

			<pre>
				{/* {JSON.stringify(superheroes?.data, null, 2)} */}
			</pre>
		</>
	)
}

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
				? { data: hero } 	// return as property of data, because we used: data.data.hero.name
				: undefined 			// undefined means fetch, instead to try to read from cache
		}
	})
}
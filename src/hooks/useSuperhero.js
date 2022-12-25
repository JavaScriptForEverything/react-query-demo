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
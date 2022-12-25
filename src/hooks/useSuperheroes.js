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
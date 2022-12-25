import { Link } from 'react-router-dom'

const pages = [
	{ path: '/', label: 'Home' },
	{ path: '/superheroes', label: 'Superheroes' },
	{ path: '/rq-superheroes', label: 'RQSuperheroes' },
	// { path: `/rq-superheroes/heroId`, label: 'RQSuperhero' },
]

const Layout = ({ children }) => {

	return (
		<>
			<ul style={{
				listStyle: 'none',
				margin: 0,
				padding:'8px 0',
				display: 'flex',
				justifyContent: 'center',
				gap: 16,
				backgroundColor: 'dodgerblue',
			}}>
				{pages.map(({ path, label }) => (
					<li key={path} style={{

					}}>
						<Link to={path} style={{
							color: 'white'
						}} >{label}</Link>
					</li>
				))}
			</ul>

			{children}
			
		</>
	)
}
export default Layout



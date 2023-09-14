import classes from './Pagination.module.css'
import { useState } from 'react'
import Crop from '../../../../CropsDisplay/Crop/'
import Pagination from './Pagination'

const RenderItems = props => {
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 6
    const lastItemIDX = currentPage*perPage
    const firstItemIDX = lastItemIDX - perPage

    const paginating = (number) => {
        setCurrentPage(number)
    }


    const currItems = props.items.slice(firstItemIDX, lastItemIDX)
    return (
        <>  
            <ul className={classes.list}>
                {currItems.map((item, index) => (
                    <Crop crop={item} key={index}/>
                ))}
            </ul>
            <Pagination 
            totalItems={props.items.length} 
            perPage={perPage} 
            paginating={paginating}
            currPage={currentPage}
            />
        </>
    )
}

export default RenderItems
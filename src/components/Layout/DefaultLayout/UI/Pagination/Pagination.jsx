import classes from './Pagination.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Pagination = ({ perPage, totalItems, paginating, currPage }) => {
    const pageNumbers = []
    // Init pageNUmber array
    const NumberofPages = Math.ceil(totalItems / perPage)
    for (let i = 1; i <= NumberofPages; i++) {
        pageNumbers.push(i)
    }
    //Pagination button handler
    const PrevPageButton = ({ onClick }) => {
        return (
            <button disabled={currPage === 1} onClick={onClick} className={classes['prev-page']}>
                <FontAwesomeIcon icon='fa-solid fa-chevron-left' />
            </button>
        )
    }

    const NextPageButton = ({ onClick }) => {
        return (
            <button
                disabled={currPage === NumberofPages}
                onClick={onClick}
                className={classes['next-page']}
            >
                <FontAwesomeIcon icon='fa-solid fa-chevron-right' />
            </button>
        )
    }

    return (
        <>
            <div className='flex items-center justify-center gap-4 mt-4 mb-6'>
                <PrevPageButton onClick={() => paginating(currPage - 1)} />

                <ul className={classes.pagination}>
                    {pageNumbers.map((number, index) =>
                        //Handle many pages with dots
                        {
                            if (currPage > 4 && index === 1) {
                                return (
                                    <li key={index}>
                                        <button>...</button>
                                    </li>
                                )
                            }
                            if (currPage < totalItems - 3 && index === totalItems - 2) {
                                return (
                                    <li key={index}>
                                        <button>...</button>
                                    </li>
                                )
                            }
                            return (
                                <li
                                    key={index}
                                    className={currPage === index + 1 ? classes.active : ''}
                                >
                                    <button onClick={() => paginating(number)}>{number}</button>
                                </li>
                            )
                        }
                    )}
                </ul>
                <NextPageButton onClick={() => paginating(currPage + 1)} />
            </div>
        </>
    )
}

export default Pagination

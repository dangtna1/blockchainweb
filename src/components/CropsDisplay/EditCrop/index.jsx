import { useContext, useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import classes from './EditCrop.module.css'
import Pic from '../../../assets/Form/Pic.png'
import { WalletAccountsContext } from '../../../context/WalletAccountsContext'
import { CropInfoContext } from '../../../context/CropInfoContext'
import { shortenAddress } from '../../../utils/shortenAddress'
import Loader from '../../Loader'

const Label = ({ children }) => <label className={classes.label}>{children}</label>

const EditCrop = () => {
    const { id } = useParams()
    const { currentAccount } = useContext(WalletAccountsContext)
    const { getCropInfo, updateCropInfo, isLoading } = useContext(CropInfoContext)
    const [cropInfo, setCropInfo] = useState({
        cropType: '',
        plantingDate: '',
        harvestDate: 0,
        fertilizers: '',
        pesticides: '',
        diseases: '',
        additionalInfo: '',
    })

    const convertDateFormat = (dateString) => {
        const parsedDate = new Date(dateString)
        return `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(parsedDate.getDate()).padStart(2, '0')}`
    }

    useEffect(() => {
        const fetchCropInfo = async () => {
            try {
                const response = await getCropInfo(id)
                const structuredCrop = {
                    cropType: response.cropType,
                    plantingDate: new Date(
                        response.plantingDate.toNumber() * 1000
                    ).toLocaleString(),
                    harvestDate: parseInt(response.monthsToHavest),
                    fertilizers: response.fertilizers.join(', ') || '',
                    pesticides: response.pesticides.join(', ') || '',
                    diseases: response.diseases.join(', ') || '',
                    additionalInfo: response.additionalInfo,
                }
                console.log(structuredCrop.plantingDate)
                setCropInfo(structuredCrop)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCropInfo()
    }, [])

    const handleSubmit = (e) => {
        console.log('Submit')
        e.preventDefault()
        updateCropInfo(
            id,
            cropInfo.cropType,
            cropInfo.plantingDate,
            cropInfo.harvestDate,
            cropInfo.fertilizers,
            cropInfo.pesticides,
            cropInfo.diseases,
            cropInfo.additionalInfo
        )
    }

    const handleChange = (e, name) => {
        setCropInfo((prevState) => ({
            ...prevState,
            [name]: e.target.value,
        }))
    }
    return (
        <>
            <div className={classes.MainForm}>
                <div className={classes.Inner}>
                    <h1 className={classes.MainTitle}>Edit a crop</h1>
                    <div className={classes.Window}>
                        <div className={classes.Pic}>
                            <img src={Pic} />
                            <div className={classes.box}>
                                {currentAccount ? (
                                    <p>
                                        You are interating with the smart contract using wallet:{' '}
                                        {shortenAddress(currentAccount)}
                                    </p>
                                ) : (
                                    <p>Please connect your wallet first...</p>
                                )}
                            </div>
                        </div>
                        <div className={classes.Form}>
                            <h1>Edit Crop Information</h1>
                            <form className={classes.MainForm} onSubmit={handleSubmit}>
                                <div className={classes['input-field']}>
                                    <div className={classes.item}>
                                        <Label>Crop Name</Label>
                                        <input
                                            type='text'
                                            onChange={(e) => handleChange(e, 'cropType')}
                                            className={classes.input}
                                            required={true}
                                            value={cropInfo.cropType}
                                        />
                                    </div>

                                    <div className={classes.item}>
                                        <Label>Planting Date</Label>
                                        <input
                                            type='date'
                                            onChange={(e) => handleChange(e, 'plantingDate')}
                                            className={classes.input}
                                            required={true}
                                            value={convertDateFormat(cropInfo.plantingDate)}
                                        />
                                    </div>

                                    <div className={classes.item}>
                                        <Label>No. months to harvest</Label>
                                        <input
                                            type='number'
                                            onChange={(e) => handleChange(e, 'harvestDate')}
                                            className={classes.input}
                                            required={true}
                                            value={cropInfo.harvestDate}
                                            min={1}
                                        />
                                    </div>

                                    <div className={classes.item}>
                                        <Label>Fertilizers </Label>
                                        <input
                                            type='text'
                                            onChange={(e) => handleChange(e, 'fertilizers')}
                                            className={classes.input}
                                            value={cropInfo.fertilizers}
                                        />
                                    </div>

                                    <div className={classes.item}>
                                        <Label>Pesticides</Label>
                                        <input
                                            type='text'
                                            onChange={(e) => handleChange(e, 'pesticides')}
                                            className={classes.input}
                                            value={cropInfo.pesticides}
                                        />
                                    </div>

                                    <div className={classes.item}>
                                        <Label>Diseases</Label>
                                        <input
                                            type='text'
                                            onChange={(e) => handleChange(e, 'diseases')}
                                            className={classes.input}
                                            value={cropInfo.diseases}
                                        />
                                    </div>

                                    <div className={classes.item}>
                                        <Label>Additional information</Label>
                                        <input
                                            type='text'
                                            onChange={(e) => handleChange(e, 'additionalInfo')}
                                            className={classes.input}
                                            value={cropInfo.additionalInfo}
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center justify-end'>
                                    {!isLoading ? (
                                        <NavLink className={classes.Cancel} to='/crops-display'>
                                            Go Back
                                        </NavLink>
                                    ) : (
                                        <button className={classes.Cancel} disabled>
                                            Go Back
                                        </button>
                                    )}
                                    {isLoading ? (
                                        <Loader></Loader>
                                    ) : (
                                        <button className={classes.Submit} type='submit'>
                                            Update
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCrop

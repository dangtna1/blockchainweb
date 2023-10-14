import { useContext } from 'react'

import { WalletAccountsContext } from '../../context/WalletAccountsContext'
import { CropInfoContext } from '../../context/CropInfoContext'
import Loader from '../Loader/index'
import { shortenAddress } from '../../utils/shortenAddress'
import Pic from '../../assets/Form/Pic.png'
import classes from './Form.module.css'

const Input = ({ placeholder, name, type, value, handleChange, required }) => (
    <input
        placeholder={placeholder}
        type={type}
        step='1'
        value={value}
        onChange={(e) => handleChange(e, name)}
        className={classes.input}
        required={required}
    />
)

const Label = ({ children }) => (
    <label className={classes.label}>{children}</label>
)

export default function Form() {
    const { currentAccount } = useContext(WalletAccountsContext)
    const {
        formData,
        handleChange,
        addCropInfoToBlockChain,
        initializeACrop,
        isLoading,
    } = useContext(CropInfoContext)

    const handleSubmit = (e) => {
        console.log('submit')
        const { cropType, plantingDate, harvestDate } = formData
        e.preventDefault()
        if (!cropType || !plantingDate || !harvestDate) {
            alert('Please fill all compulsary fields')
            return
        }
        addCropInfoToBlockChain()
    }

    const createACrop = () => {
        initializeACrop()
    }

    return (
        <div className={classes.MainForm}>
            <div className={classes.Inner}>
                <h1 className={classes.MainTitle}>Publish a crop</h1>
                <div className={classes.Window}>
                    <div className={classes.Pic}>
                        <img src={Pic} />
                        <div className={classes.box}>
                            {currentAccount ? (
                                <p>
                                    You are interating with the smart contract
                                    using wallet:{' '}
                                    {shortenAddress(currentAccount)}
                                </p>
                            ) : (
                                <p>Please connect your wallet first...</p>
                            )}
                        </div>
                    </div>
                    <div className={classes.Form}>
                        <h1>Enter Your Information</h1>
                        <h2>
                            You can also{' '}
                            <span
                                className='text-orange-500 underline hover: cursor-pointer'
                                onClick={createACrop}
                            >
                                initialize
                            </span>{' '}
                            a crop
                        </h2>
                        <form
                            className={classes.MainForm}
                            onSubmit={handleSubmit}
                        >
                            <div className={classes['input-field']}>
                                <div className={classes.item}>
                                    <Input
                                        required={true}
                                        name='cropType'
                                        type='text'
                                        handleChange={handleChange}
                                    />
                                    <Label>Crop Name</Label>
                                </div>
                                <div className={classes.item}>
                                    <Input
                                        required={true}
                                        name='plantingDate'
                                        type='date'
                                        handleChange={handleChange}
                                    />
                                    <Label>Planting Date</Label>
                                </div>

                                <div className={classes.item}>
                                    <Input
                                        required={true}
                                        name='harvestDate'
                                        type='number'
                                        handleChange={handleChange}
                                    />
                                    <Label>No. months to harvest</Label>
                                </div>

                                <div className={classes.item}>
                                    <Input
                                        required={true}
                                        name='fertilizers'
                                        type='text'
                                        handleChange={handleChange}
                                    />
                                    <Label>Fertilizes</Label>
                                    <Input
                                        placeholder='fertilizer1, fertilizer2, fertilizer3, ...'
                                        name='fertilizers'
                                        type='text'
                                        handleChange={handleChange}
                                    />
                                </div>

                                <div className={classes.item}>
                                    <Input
                                        required={true}
                                        name='pesticides'
                                        type='text'
                                        handleChange={handleChange}
                                    />
                                    <Label>Pesticides</Label>
                                    <Input
                                        placeholder='pesticide1, pesticide2, pesticide3, ...'
                                        name='pesticides'
                                        type='text'
                                        handleChange={handleChange}
                                    />
                                </div>

                                <div className={classes.item}>
                                    <Input
                                        required={true}
                                        name='diseases'
                                        type='text'
                                        handleChange={handleChange}
                                    />
                                    <Label>Diseases</Label>
                                    <Input
                                        placeholder='disease1, disease2, disease3, ...'
                                        name='diseases'
                                        type='text'
                                        handleChange={handleChange}
                                    />
                                </div>

                                <div className={classes.item}>
                                    <Input
                                        required={true}
                                        name='additionalInfo'
                                        type='text'
                                        handleChange={handleChange}
                                    />
                                    <Label>Additional information</Label>
                                    <Input
                                        placeholder='Additional information'
                                        name='additionalInfo'
                                        type='text'
                                        handleChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex items-center justify-end'>
                                {isLoading ? (
                                    <Loader></Loader>
                                ) : (
                                    <button
                                        className={classes.Submit}
                                        type='submit'
                                    >
                                        Publish
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

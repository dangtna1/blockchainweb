import { useContext } from 'react'

import { WalletAccountsContext } from '../../context/WalletAccountsContext'
import { CropInfoContext } from '../../context/CropInfoContext'
import Loader from '../Loader/index'
import { shortenAddress } from '../../utils/shortenAddress'
import Pic from '../../assets/Form/Pic.png'
import classes from './Form.module.css'

const Input = ({ placeholder, name, type, value, handleChange, required, disabled }) => (
    <input
        placeholder={placeholder}
        type={type}
        step='1'
        value={value}
        onChange={(e) => handleChange(e, name)}
        className={classes.input}
        required={required}
        disabled={disabled}
        min={1}
    />
)

const Label = ({ children }) => <label className={classes.label}>{children}</label>

export default function Form() {
    const { currentAccount } = useContext(WalletAccountsContext)
    const { handleChange, addCropInfoToBlockChain, initializeACrop, isLoading } =
        useContext(CropInfoContext)

    const handleSubmit = (e) => {
        console.log('submit')
        e.preventDefault()
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
                                    You are interating with the smart contract using wallet:{' '}
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
                        <form className={classes.MainForm} onSubmit={handleSubmit}>
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
                                        name='noOfCrops'
                                        type='number'
                                        handleChange={handleChange}
                                    />
                                    <Label>No. crops</Label>
                                </div>

                                <div className={classes.item}>
                                    <Input
                                        required={false}
                                        name='fertilizers'
                                        type='text'
                                        handleChange={handleChange}
                                        placeholder='fertilizer1, fertilizer2, fertilizer3, ...'
                                    />
                                    <Label>Fertilizers </Label>
                                </div>

                                <div className={classes.item}>
                                    <Input
                                        required={false}
                                        name='pesticides'
                                        type='text'
                                        handleChange={handleChange}
                                        disabled={false}
                                        placeholder='pesticide1, pesticide2, pesticide3, ...'
                                    />
                                    <Label>Pesticides</Label>
                                </div>

                                <div className={classes.item}>
                                    <Input
                                        required={false}
                                        name='diseases'
                                        type='text'
                                        handleChange={handleChange}
                                        placeholder='disease1, disease2, disease3, ...'
                                    />
                                    <Label>Diseases</Label>
                                </div>

                                <div className={classes.item}>
                                    <Input
                                        required={false}
                                        name='additionalInfo'
                                        type='text'
                                        handleChange={handleChange}
                                        placeholder='additional information'
                                    />
                                    <Label>Additional information</Label>
                                </div>
                            </div>

                            <div className='flex items-center justify-end'>
                                {isLoading ? (
                                    <Loader></Loader>
                                ) : (
                                    <button
                                        className={classes.Submit}
                                        type='submit'
                                        disabled={
                                            currentAccount !==
                                            '0x0d22c5b0dbd93aeb3ba644218363d5282b40fb5e'
                                        }
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

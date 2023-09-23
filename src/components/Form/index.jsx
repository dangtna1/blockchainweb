import { useContext } from 'react';
import classes from './Form.module.css'
import { CropInfoContext } from '../../context/CropInfoContext';
import { WalletAccountsContext } from '../../context/WalletAccountsContext';
import Loader from '../Loader/index';
import Pic from '../../assets/Form/Pic.png'
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className={classes.input}
    />
);

const Label = ({ children }) => (
    <label
        className={classes.label}
    >
        {children}
    </label>
)

export default function Form() {
    const { currentAccount } = useContext(WalletAccountsContext)
    const {
        formData,
        handleChange,
        addCropInfoToBlockChain,
        isLoading
    } = useContext(CropInfoContext);

    const handleSubmit = (e) => {
        console.log("submit");
        const { cropType, plantingDate, harvestDate, fertilizers, pesticides } = formData;
        e.preventDefault();
        if (!cropType || !plantingDate || !harvestDate || !fertilizers || !pesticides) {
            alert('Please fill all fields');
            return;
        }
        addCropInfoToBlockChain();
    };

    return (
        <div className={classes.Form}>
            <div className={classes.Inner}>
                <h1 className={classes.MainTitle}>Publish a crop</h1>
                <div className={classes.Window}>
                    <div className={classes.Pic}>
                        <img src={Pic} />
                    </div>
                    <div className={classes.Form}>
                        <form
                            className={classes.MainForm}
                            onSubmit={handleSubmit}
                        >
                            <div className={classes['input-field']}>
                                <div className={classes.item}>
                                    <Label>Name</Label>
                                    <Input placeholder="Crop Type" name="cropType" type="text" handleChange={handleChange} />
                                </div>

                                <div className={classes.item}>
                                    <Label>Planting Date</Label>
                                    <Input placeholder="Planting Date" name="plantingDate" type="date" handleChange={handleChange} />
                                </div>

                                <div className={classes.item}>
                                    <Label>Harvest Date</Label>
                                    <Input placeholder="Harvest Date" name="harvestDate" type="date" handleChange={handleChange} />
                                </div>

                                <div className={classes.item}>
                                    <Label>Fertilizes</Label>
                                    <Input placeholder="fertilizer1, fertilizer2, fertilizer3, ..." name="fertilizers" type="text" handleChange={handleChange} />
                                </div>

                                <div className={classes.item}>
                                    <Label>Pesticides</Label>
                                    <Input placeholder="pesticide1, pesticide2, pesticide3, ..." name="pesticides" type="textarea" handleChange={handleChange} />
                                </div>

                                <div className={classes.item}>
                                    {
                                        currentAccount ?
                                            <Label>You are interating with the smart contract using wallet: {currentAccount}</Label> :
                                            <Label>Please connect your wallet first...</Label>
                                    }
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                {
                                    isLoading ? <Loader></Loader> : (
                                        <button
                                            className={classes.Submit}
                                            type="submit"
                                        >
                                            Publish
                                        </button>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
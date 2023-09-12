import * as React from 'react';
import './Form.css'
import { CropInfoContext } from '../../context/CropInfoContext.jsx';
import { TransactionContext } from '../../context/TransactionContext.jsx';
import Loader from '../Loader/index.jsx';

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
    />
);

const Label = ({ children }) => (
    <label
        className="block text-gray-700 text-sm font-bold mb-2"
    >
        {children}
    </label>
)

export default function Form() {
    const {
        currentAccount,
        formData,
        handleChange,
        addCropInfoToBlockChain,
        isLoading
    } = React.useContext(CropInfoContext);

    const { transactions, sendTransaction } = React.useContext(TransactionContext)

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

    const check = (addressTo, price) => {
        console.log(addressTo, price);
        console.log(currentAccount);
        sendTransaction(currentAccount, addressTo, price);
    }

    return (
        <div className="controller-container">
            <div className="controller-inner">
                <h1 className="font-bold text-title-4 text-primary-200 flex justify-center mb-4">Publish a crop</h1>
                <div className="min-h-screen flex justify-center">
                    <form
                        className="bg-white shadow-md p-6 w-96 rounded-xl"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4">
                            <Label>Name</Label>
                            <Input placeholder="Crop Type" name="cropType" type="text" handleChange={handleChange} />

                            <Label>Planting Date</Label>
                            <Input placeholder="Planting Date" name="plantingDate" type="date" handleChange={handleChange} />

                            <Label>Harvest Date</Label>
                            <Input placeholder="Harvest Date" name="harvestDate" type="date" handleChange={handleChange} />

                            <Label>Fertilizes</Label>
                            <Input placeholder="fertilizer1, fertilizer2, fertilizer3, ..." name="fertilizers" type="text" handleChange={handleChange} />

                            <Label>Pesticides</Label>
                            <Input placeholder="pesticide1, pesticide2, pesticide3, ..." name="pesticides" type="textarea" handleChange={handleChange} />

                            <Label>Price</Label>
                            <Input placeholder="Price (ETH)" name="price" type="number" handleChange={handleChange} />
                        </div>

                        <div className="flex items-center justify-end">
                            {
                                isLoading ? <Loader></Loader> : (

                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
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

    )
}
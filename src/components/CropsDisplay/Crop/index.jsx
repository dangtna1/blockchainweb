import classes from './Crop.module.css'

//logos
import croptype from '../../../assets/cropsDisplay/croptype.svg'
import date from '../../../assets/cropsDisplay/date.svg'
import cropfer from '../../../assets/cropsDisplay/cropfer.svg'
import croppes from '../../../assets/cropsDisplay/croppes.svg'
import cropprice from '../../../assets/cropsDisplay/cropprice.svg'


const Crop = props => {
    const crop = props.crop
    return (
        <>
            <div
                key={props.index}
                className={classes.crop}
            >
                <div className="flex jutify-center items-center">
                    <img src={croptype} alt="crop type" />
                    <p className="text-primary-200 mx-2">Name: </p>
                    <span>{crop.cropType}</span>
                </div>

                <div className="flex jutify-center items-center">
                    <img src={date} alt="date" />
                    <p className="text-primary-200 mx-2">Planting date: </p>
                    <span>{crop.plantingDate.split(',')[0]}</span>
                </div>

                <div className="flex jutify-center items-center">
                    <img src={date} alt="date" />
                    <p className="text-primary-200 mx-2">Harvest date (expect): </p>
                    <span>{crop.harvestDate.split(',')[0]}</span>
                </div>

                <div className="flex jutify-center items-center">
                    <img src={cropfer} alt="crop fertilizers" />
                    <p className="text-primary-200 mx-2">Fertilizers: </p>
                    <span>{crop.fertilizers.join(', ')}</span>
                </div>

                <div className="flex jutify-center items-center">
                    <img src={croppes} alt="crop pesticides" />
                    <p className="text-primary-200 mx-2">Pesticides: </p>
                    <span>{crop.pesticides.join(', ')}</span>
                </div>

                <div className="flex jutify-center items-center">
                    <img src={cropprice} alt="cropprice" />
                    <p className="text-primary-200 mx-2">Price (ETH): </p>
                    <span>{crop.price}</span>
                </div>

                <div className="flex justify-end"><button className="rounded-full bg-emerald-300 px-6 py-1" onClick={() => alert("This feature is being developed")}>Buy</button></div>
            </div>
        </>
    )
}

export default Crop 
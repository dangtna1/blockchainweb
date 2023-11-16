import cropInfo from './CropInfo.json'
import controllerContract from './ControllerContract.json'
import sensorDataContract from './SensorDataContract.json'
import transaction from './Transactions.json'

export const cropInfoAddress = '0x7Ef5ea0e10C662d0CbF43E938F9e2fAb0e4eDF41'
export const cropInfoABI = cropInfo.abi

export const controllerAddress = '0x6856d209b1f6d31337800104413BB1A271562b35'
export const controllerABI = controllerContract.abi

export const sensorDataAddress = '0x9cFAbD4E2352f2ADb4180F6055e838F7a77304b6'
export const sensorDataABI = sensorDataContract.abi

export const transactionAddress = '0x854FDE9cA1f617A5638501bDB846Fed933577E0B'
export const transactionABI = transaction.abi

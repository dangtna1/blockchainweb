import cropInfo from './CropInfo.json'
import controllerContract from './ControllerContract.json'
import sensorDataContract from './SensorDataContract.json'
import transaction from './Transactions.json'

export const cropInfoAddress = '0xE5167B378750E70B969240BdE7755B56ccC9C26D'
export const cropInfoABI = cropInfo.abi

export const controllerAddress = '0x247b5232b76aB1aF94f7F543B33c8dd501517Ab8'
export const controllerABI = controllerContract.abi

export const sensorDataAddress = '0x30e04Bf0cfcC2c6E94FE385854656f5963460d32'
export const sensorDataABI = sensorDataContract.abi

export const transactionAddress = '0x854FDE9cA1f617A5638501bDB846Fed933577E0B'
export const transactionABI = transaction.abi

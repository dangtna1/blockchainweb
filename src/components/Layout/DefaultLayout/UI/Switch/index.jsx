import Switch from 'react-switch'
import './MySwitch.css'

export default function MySwitch(props) {
    return (
        <Switch
            onChange={props.onChange}
            checked={props.checked}
            disabled={!props.isEnabled}

            checkedIcon={false}
            uncheckedIcon={false}

            onColor="#5D9C59"
            offColor='#DF2E38'

            className='mySwitch'

            height={25}
            handleDiameter={18}
        />
    )
}
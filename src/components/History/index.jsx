import { useContext } from 'react';

import { ControllerContext } from '../../context/ControllerContext';
import classes from './History.module.css';
import Pic from '../../assets/History/Pic.jpg';

const History = () => {
  const { controllersInfo } = useContext(ControllerContext);
  const reversedControllerInfo = [...controllersInfo].reverse();

  return (
    <div>
      <h1 className={classes.MainTitle}>Care history</h1>
      
      <div className={classes['history-container']}>
        <div className={classes['custom-scrollbar']}>
          <ul>
            {reversedControllerInfo.map((controller, index) => {
              const signal = controller.value === 1 ? "on" : "off";
              const historyLine = `${controller.deviceName} was turned ${signal}`
              return (
                <li key={index}><span className={classes.timestamp}>{controller.createAt}: </span>{historyLine}</li>
              )
            })}
          </ul>
        </div>

        <div>
          <div className={classes['outer-image-container']}>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
            <div></div>
          </div>

          <div className={classes['outer-image-container']}>
            <div></div>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
          </div>

          <div className={classes['outer-image-container']}>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
            <div></div>
          </div>

          <div className={classes['outer-image-container']}>
            <div></div>
            <div className={classes['image-container']}>
              <img src={Pic} className={classes['image-style']} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History;

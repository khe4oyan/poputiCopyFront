import React from 'react';

// styles
import classes from './styles.module.css';

export default function CustomDropDownMenu({ title, options, valueIndex, setValueIndex }) {
  const [isOptionsOpened, setIsOptionsOpened] = React.useState(false);

  const openToggle = () => {
    setIsOptionsOpened(prev => !prev);
  };

  const selectOption = (ind) => {
    setValueIndex(ind);
    setIsOptionsOpened(false);
  }

  return (
    <div className={classes.root}>
      {title && <p className={classes.title}>{title}</p>}
      <button onClick={openToggle} className={`${classes.box} ${classes.button}`}>
        <div className={classes.content} >
          <p>{options[valueIndex]}</p>
        </div>
        <img
          width={20}
          height={10}
          src="https://www.iconpacks.net/icons/2/free-arrow-down-icon-3101-thumb.png"
        />
      </button>
      {
        isOptionsOpened &&
        <div className={classes.options}>
          {
            options.map((item, ind) =>
              <button key={ind} onClick={() => selectOption(ind)} className={classes.box}>
                {item}
              </button>
            )
          }
        </div>
      }
    </div>
  )
}
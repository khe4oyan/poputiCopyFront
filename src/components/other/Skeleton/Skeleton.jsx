// styles
import classes from './styles.module.css';

export default function Skeleton({
  width = 50,
  height = 50,
  radius = 5,
  color = '#0004',
  style = null,
  indicatorColor = null
}) {

  const mainStyles = {
    width: width,
    height: height,
    borderRadius: radius,
    backgroundColor: color,
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={mainStyles} className={style}>
      {
        indicatorColor &&
        <svg
          className={classes.container}
          viewBox="0 0 40 40"
          height="40"
          width="40"
        >
          <circle
            className={classes.track}
            cx="20"
            cy="20"
            r="17.5"
            pathlength="100"
            stroke-width="5px"
            fill="none"
          />
          <circle
            className={classes.car}
            cx="20"
            cy="20"
            r="17.5"
            pathlength="100"
            stroke-width="5px"
            fill="none"
          />
        </svg>
      }
    </div>
  )
}
// styles
import classes from './styles.module.css';

export default function CustomInput({ title, value, setValue, placeholder, type = "text", classValue = "" }) {
  return (
    <div className={classes.root}>
      {title && <p className={classes.title}>{title}</p>}

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${classes.input} ${classValue}`}
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}

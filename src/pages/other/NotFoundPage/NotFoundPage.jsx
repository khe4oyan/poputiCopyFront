// libs
import { useNavigate } from 'react-router-dom';

// styles
import classes from './styles.module.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate(-1);
  }

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <p>404</p>
        <p>page not found</p>
      </div>
      <button onClick={buttonHandler}>go back</button>
    </div>
  )
}
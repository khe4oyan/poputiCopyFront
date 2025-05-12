// libs
import { useTranslation } from 'react-i18next';

// styles
import classes from './styles.module.css';

export default function CustomFileInput({ title, value, setValue }) {
  const {t} = useTranslation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setValue(fileURL);
    }
  };

  return (
    <div className={classes.root}>
      {title && <p className={classes.title}>{title}</p>}

      <div className={classes.container}>
        <p className={classes.value}>{value ? t('selected_file') : t('not_selected')}</p>
        <label className={classes.button}>
          {value ? t('select_other_photo') : t('select_photo')}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
}

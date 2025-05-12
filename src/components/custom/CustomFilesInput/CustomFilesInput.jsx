// libs
import { useTranslation } from 'react-i18next';

// styles
import classes from './styles.module.css';

export default function CustomFilesInput({ title, value, setValue }) {
  const {t } = useTranslation();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setValue(urls);
  };

  return (
    <div className={classes.root}>
      {title && <p className={classes.title}>{title}</p>}

      <div className={classes.container}>
        <p>{value.length ? `${t('selected_files')}: ${value.length}` : t('not_selected')}</p>
        <label className={classes.button}>
          {value.length ? t('select_other_photo') : t('select_photo')}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
}

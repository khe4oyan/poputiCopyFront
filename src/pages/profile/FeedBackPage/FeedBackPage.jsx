// libs
import { useTranslation } from 'react-i18next';

// styles
import classes from './styles.module.css';

function SocialIcon({ title, icon }) {
  return (
    <div className={classes.socialIconContainer}>
      <img
        src={icon}
        width={30}
        height={30}
        alt={title}
      />
      <p>{title}</p>
    </div>
  );
}

export default function FeedBackPage() {
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={`${classes.flexRow} ${classes.flexBetween} ${classes.section_1}`}>
        <SocialIcon
          title={t('call')}
          icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvIH0qQEwp_XV51RMqRW30rtrLvU0EI9wTg&s"
        />
        <SocialIcon
          title={t('gmail')}
          icon="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-gmail-512.png"
        />
      </div>

      <div className={`${classes.flexRow} ${classes.section_2}`}>
        <img
          width={70}
          height={70}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/960px-Facebook_logo_%28square%29.png"
          alt="Facebook"
        />
        <img
          width={70}
          height={70}
          style={{ borderRadius: 15 }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
          alt="Instagram"
        />
      </div>

      <div className={classes.section_3}>
        <p className={classes.headerText}>{t('aboutUs')}</p>
        <p>{t('aboutUsText')}</p>
      </div>
    </div>
  )
}

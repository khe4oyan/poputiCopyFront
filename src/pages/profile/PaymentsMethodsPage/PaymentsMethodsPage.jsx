// libs
import { useTranslation } from 'react-i18next';

// styles
import classes from './styles.module.css';

const PaymentMethod = ({ title, icon }) => {
  return (
    <div className={classes.payMethod}>
      <div className={classes.content}>
        <img src={icon} width={50} height={50} alt={title} />
        <p className={classes.contentText}>{title}</p>
      </div>
    </div>
  );
};

export default function PaymentsMethodsPage() {
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <p className={classes.headerText}>{t('selectPaymentMethod')}</p>

      <PaymentMethod title={t('creditCard')} icon="https://cdn-icons-png.flaticon.com/512/126/126057.png" />
      <PaymentMethod title={t('IDram')} icon="https://idbank.am/documents/IDBank_logo_300x300.png" />
    </div>
  );
};

// libs
import { useState } from 'react';

// components
import Header from '../../../components/other/Header';
import TabNavigation from '../../../components/other/TabNavigation';
import CustomInput from '../../../components/custom/CustomInput';

// styles
import classes from './styles.module.css';

export default function MessagesPage() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const onClickHandler = () => {
    if (msg !== "") {
      setMessages(prev => [...prev, msg]);
      setMsg("");
    }
  }

  return (
    <div className={classes.root}>
      <Header title="Messages" />

      <div>
        {
          messages.map((message, i) =>
            <p key={i} className={classes.message}>{message}</p>
          )
        }
      </div>

      <div className={classes.inputBox}>
        <CustomInput
          value={msg}
          setValue={setMsg}
          classValue={classes.input}
          placeholder="Message"
        />
        <button className={classes.button} disabled={msg === ""} onClick={onClickHandler}>send</button>
      </div>
      <TabNavigation />
    </div>
  )
}
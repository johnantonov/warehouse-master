
'use client'
import { useState } from 'react';
import { enter } from "../Funcs/enter";
import { useRouter } from "next/navigation";

const AuthWindow = ({ prevPage }) => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  if (prevPage === 'login') {
    prevPage = '/'
  }

  const enterSubmit = (e) => {
    try {
      e.preventDefault();
      enter(email);
      router.push(prevPage);
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div className="mar-l-16 mar-r-16">
      <h4 className="mar-t-20">Введите email</h4>
      <form className="mar-t-20" onSubmit={enterSubmit}>
        <input
          type="email"
          name="email"
          placeholder="ivanov@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="mar-t-12 waves-effect waves-light orange lighten-1 btn" type="submit" name="submit" value={'Войти'} />
      </form>
    </div>
  );
};

export default AuthWindow;
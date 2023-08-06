import css from './button.module.css';
import Link from 'next/link';

export default function Button(props) {
  return (
    <Link className={css.btn} href={props.link}>
      {props.children}
    </Link>
  );
}

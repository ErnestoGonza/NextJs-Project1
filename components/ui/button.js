import css from './button.module.css';
import Link from 'next/link';

export default function Button(props) {
  if (props.link) {
    return (
      <Link className={css.btn} href={props.link}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={css.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import NavMenu from '~/components/NavMenu';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>

        <div className={cx('logo')}>
          <img src="logo.png" alt="Studocu Logo" />
        </div>

        <div className={cx('menu')}>
          <NavMenu />
        </div>

        <div className={cx('button')}>
          <button>Sign in</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

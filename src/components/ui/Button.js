import Link from 'next/link';
import styles from './Button.module.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  href,
  ...props 
}) {
  const combinedClassName = `${styles.button} ${styles[variant]} ${className}`;

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} className={combinedClassName} {...props}>
          {children}
        </a>
      );
    }

    if (href.startsWith('#')) {
      const handleScroll = (e) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

      return (
        <a href={href} className={combinedClassName} onClick={handleScroll} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={combinedClassName} 
      {...props}
    >
      {children}
    </button>
  );
}

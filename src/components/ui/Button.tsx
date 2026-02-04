import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  href?: string;
  target?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  href,
  ...props 
}: ButtonProps) {
  const combinedClassName = `${styles.button} ${styles[variant]} ${className}`;

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} className={combinedClassName} {...(props as any)}>
          {children}
        </a>
      );
    }

    if (href.startsWith('#')) {
      const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

      return (
        <a href={href} className={combinedClassName} onClick={handleScroll} {...(props as any)}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClassName} {...(props as any)}>
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

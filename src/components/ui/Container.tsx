interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div 
      className={className}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
}

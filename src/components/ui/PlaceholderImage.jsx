export default function PlaceholderImage({ text, height = '300px', className = '' }) {
  return (
    <div 
      className={className}
      style={{
        width: '100%',
        height: height,
        backgroundColor: '#e5e7eb', // gray-200
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280', // gray-500
        fontWeight: '500',
        borderRadius: '0.75rem',
        border: '1px dashed #d1d5db',
      }}
    >
      {text || 'Image Placeholder'}
    </div>
  );
}

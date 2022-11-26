export default function Card({children,noPadding}) {
  let classes = 'bg-white shadow-md shadow-gray-300 rounded-md mb-5';
  if (!noPadding) {
    classes += ' p-4';
  }
  return (
    <div className={classes}>
      {children}
    </div>
  );
}
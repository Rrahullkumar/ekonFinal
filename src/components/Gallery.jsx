export default function Gallery() {
  return (
    <div className="gallery">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => (
        <div className="project" key={num}>
          <div className="index">
            <div className="mask" style={{ height: num >= 10 ? '85px' : '70px' }}>
              <h1>{num.toString().padStart(2, '0')}</h1>
            </div>
          </div>
          <div className="images"></div>
        </div>
      ))}
    </div>
  );
}

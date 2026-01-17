export default function PreviewMedia() {
  return (
    <div className="preview-img">
      <video autoPlay muted loop playsInline>
        <source src="/assets/testvideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

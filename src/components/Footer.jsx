import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-blue text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} Staff Directory</p>
      </div>
    </footer>
  );
}

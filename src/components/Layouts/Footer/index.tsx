import "./styles.scss";

const Footer = () => {
  return (
    <footer className="user-footer">
      <div className="user-footer__content">
        <p>&copy; {new Date().getFullYear()} HostPro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

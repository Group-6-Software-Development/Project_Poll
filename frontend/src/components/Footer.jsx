import "./styles/Footer.css";
const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
      <p> {`Copyright © Group Six Industries ${year}`} </p>
    </footer>
  );
};

export default Footer;

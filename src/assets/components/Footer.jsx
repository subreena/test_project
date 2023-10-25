
const Footer = () => {
    let f = {
        backgroundColor: '#0d6efd',
    marginTop: '100px',
    padding: '20px',
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
    }
    return (
        <footer id="footer" style={f}>
      <span className="text-white"> Copyright 2023 </span>
    </footer>
    );
};

export default Footer;
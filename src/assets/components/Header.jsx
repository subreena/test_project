import i1 from "../../assets/images/img1.jpg";
const Header = () => {
    return (
        <div className="d-flex justify-content-center">
           <img src={i1} alt="ICE" 
           style={{
            width: '90%',
            height: '85vh',
            margin: '0 50px 20px 50px'
           }}
           /> 
        </div>
    );
};

export default Header;
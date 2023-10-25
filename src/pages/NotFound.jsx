import SecondNav from '../assets/components/secondNav';
import Footer from '../assets/components/Footer';
import MiniNav from '../assets/components/miniNav';

const NotFound = () => {
    return (
        <div>
           <MiniNav/>
           <SecondNav/>
            <h1>
                404! page not found
            </h1>
            <Footer/>
        </div>
    );
};

export default NotFound;
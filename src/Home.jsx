
import Header from './assets/components/Header';
import Contact from './assets/components/Contact';
import Service from './assets/components/Service';
import FeedbackSection from './assets/components/FeedbackSection';

const Home = () => {
    return (
    <div style={{minHeight: '100vh'}}>
   
      <Header/>
      <Service/>
      <FeedbackSection/>
      {/* <Contact/> */}
     
    </div>
    
    );
};

export default Home;
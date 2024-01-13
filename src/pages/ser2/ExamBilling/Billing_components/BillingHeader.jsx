import { Container, Row } from 'react-bootstrap';
import logo from '../../../../assets/images/nstu-logo.png';

const BillingHeader = () => {
    return (
        <div className='mt-5'>
        <Container fluid>
            <Row>
                <div className="col-6">
                    <Row>
                    <div className="col-5">
                        <img src={logo} alt="" style={{width: '80px', height: '120px', marginLeft: '50px'}} />
                    </div>
                    <div className="col-7">
                        <p className='mt-3'>
                        নোয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় <br />
                        Noakhali Science and Technology University <br />
                        <span className="text-center">নোয়াখালী - ৩৮১৪</span>
                        </p>
                    </div>

                    </Row>
                </div>
                <div className="col-6">
                    <Row>
                        <div className="col-6">
                            <p className='mt-3'>
                                Mobile: 01811 &nbsp; 150935 <br />
                                E-mail: info nstu.edu.bd <br />
                                Website: www.nstu.edu.bd <br />    
                            </p>
                        </div>
                        <div className="col-6 mt-3">
                            <h3>
                            পরীক্ষা নিয়ন্ত্রক দপ্তর
                            </h3>
                        </div>
                    </Row>


                </div>



            </Row>

        </Container>
        </div>
    );
};

export default BillingHeader;
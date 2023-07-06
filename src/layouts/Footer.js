import React from 'react'
import logo2 from '../../src/assets/images/home/logo.png';

const Footer = (props) => {
    return (
        <div className=" bg-primary" style={{bottom: "0 !important",}}>
            <div className="container">
                {/* Footer */}
                <footer className="footer pt-6 bg-primary text-white">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-6">
                            <img src={logo2} className="mr-2" alt="" height={50} width={50}/>
                            <span className="text-sentence font-weight-500"> e-Learn NG</span>
                
                            <h3 className="mt-5 text-white">Online Learning the right way.</h3>
                
                            <div className="socials my-4">
                                <a href="#" className="text-white"><i className="fab fa-facebook mr-3"></i></a>
                                <a href="#" className="text-white"><i className="fab fa-twitter mr-3"></i></a>
                                <a href="#" className="text-white"><i className="fab fa-instagram mr-3"></i></a>
                            </div>
                        </div>
            
                        <div className="col-lg-6 d-flex justify-content-between foot-content">
                            <div className="d-flex flex-column">
                                <h3 className="text-uppercase">About</h3>
                                <a href="#" className="mb-3">About Us</a>
                                <a href="#" className="mb-3">Pricing </a>
                                <a href="#" className="mb-3">Support </a>
                            </div>
                
                            <div className="d-flex flex-column">
                                <h3 className="text-uppercase">Company</h3>
                                <a href="#" className="mb-3">Contact Us</a>
                                <a href="#" className="mb-3">Our Products </a>
                                <a href="#" className="mb-3">Get a Quote </a>
                            </div>
                
                            <div className="d-flex flex-column">
                                <h4 className="text-uppercase">Legal</h4>
                                <a href="#" className="mb-3">Terms of Use</a>
                                <a href="#" className="mb-3">Privacy </a>
                                <a href="#" className="mb-3">Legal </a>
                            </div>
                        </div>
                    </div>
        
                    <div className="copyright text-white-50 mt-5">
                        Copyright © 2019 <a href="https://www.lloydant.com/" className="font-weight-bold ml-1 text-white" target="_blank" rel="noopener noreferrer">Lloydant</a>. All rights reserved.
                    </div>
                </footer>
            </div>
        </div>
    )
};

export default Footer

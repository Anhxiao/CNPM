const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-left">

                    <strong>

                        Personal Project Management System

                    </strong>

                </div>

                <div className="footer-center">

                    © {currentYear} - All Rights Reserved

                </div>

                <div className="footer-right">

                    Version 1.0.0

                </div>

            </div>

        </footer>

    );

};

export default Footer;
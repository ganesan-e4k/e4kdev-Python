import Link from 'next/link';



// Define the Footer component
export default function Footer() {
  return (
    <footer>
      {/* <!-- Start Footer area--> */}
        <div className="footer-copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="footer-copy-right">
                            <p>Copyright © 2024. All rights reserved. Template by <a href="">e4k</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- End Footer area--> */}
    </footer>
  );
}

import { Inter } from "next/font/google";
import './globals.css';
import ReduxProvider from './provider/ReduxProvider'
import 'smart-webcomponents-react/source/styles/smart.default.css';
import Script from 'next/script';


const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "E4k Echo SCM",
  description: "E4k Supply Chain Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      

      <head>
        {/* <script src="http://localhost:3000/assets/js/jquery-1.12.4.min.js"></script>
        <script src="http://localhost:3000/assets/js/bootstrap.min.js"></script>  */}
        <Script 
            src="/assets/js/jquery-1.12.4.min.js" 
            //strategy="beforeInteractive"
        />
        <Script 
            src="/assets/js/bootstrap.min.js" 
           // strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
          <ReduxProvider>
            {children} 
            
          </ReduxProvider>  
          
      </body>
    </html>
  );
}

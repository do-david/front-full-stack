import { FC } from 'react'

const Footer:FC = () => {
    return (
      <>
        <footer className="container px-6 mx-auto text-center bg-white border border-gray-300 rounded-lg shadow">
          <div className="p-6">Copyright &copy; {new Date().getFullYear()} David / ynov</div>
        </footer>
      </>
    );
  };
  
  export default Footer;
  
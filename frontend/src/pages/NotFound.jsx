import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerVariants } from '../../components/Constant/Constants.jsx';

function NotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <section className="flex justify-center items-center pt-12 px-20 gap-30">
        <div className="w-full">
          <p className="font-semibold text-4xl">
            We can’t seem to find the page you’re looking for
          </p>
          <p className="font-semibold text-2xl mt-6">
            Please check the URL and try again.
          </p>
          <div className="font-semibold text-2xl mt-10 w-40">
            <button
              className="primary hover:bg-secondary transition my-4"
              onClick={handleClick}
            >
              Home
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <img src="../../404_error.gif" alt="404 Not Found" />
        </div>
      </section>
    </motion.div>
  );
}

export default NotFound;
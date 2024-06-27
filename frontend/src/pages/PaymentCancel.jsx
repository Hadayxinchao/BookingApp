import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { containerVariants } from '../components/Constants';

function PaymentCancel() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <>
      <motion.section
        className="flex justify-center items-center pt-12 px-20 gap-30"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="w-full">
          <p className="font-semibold text-4xl">Payment unsuccessful</p>
          <p className="font-semibold text-2xl mt-6">
            Transaction was declined. Please try again.
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
          <img src="../404_error.gif" alt="404 Not Found" />
        </div>
      </motion.section>
    </>
  );
}

export default PaymentCancel;
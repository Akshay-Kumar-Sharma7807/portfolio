import React from 'react';
import { motion } from 'framer-motion';

export const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container min-h-screen pt-20 relative mx-auto px-4 py-8 bg-transparent rounded-lg shadow-lg text-white"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-center text-white mb-6"
      >
        Contact Me
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-lg text-center text-white mb-8"
      >
        Feel free to get in touch with me using the form below or the contact information provided.
      </motion.p>
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-1 gap-6 max-w-lg mx-auto"
      >
        <div>
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="block text-sm font-medium text-white"
          >
            Name:
            <motion.input
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              type="text"
              name="name"
            />
          </motion.label>
        </div>
        <div>
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="block text-sm font-medium text-white"
          >
            Email:
            <motion.input
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              type="email"
              name="email"
            />
          </motion.label>
        </div>
        <div>
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="block text-sm font-medium text-white"
          >
            Message:
            <motion.textarea
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              name="message"
            />
          </motion.label>
        </div>
        <motion.input
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full py-3 px-6 border border-black rounded-md shadow-sm text-lg font-medium text-black bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          type="submit"
          value="Submit"
        />
      </motion.form>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-12 max-w-md mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-center text-white mb-4"
        >
          Contact Information
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-center text-white"
        >
          Email: sharmaakshaykumar7807@gmail.com
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-center text-white"
        >
          Phone: +91-8209332962
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Contact;

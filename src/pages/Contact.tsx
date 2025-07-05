import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const Contact = () => {
  useEffect(() => {
    // Load Tally script dynamically
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.head.appendChild(script);

    // Add custom CSS to fix Tally form text visibility
    const style = document.createElement("style");
    style.textContent = `
      /* Override Tally form styles for better visibility on dark background */
      iframe[data-tally-src] {
        color-scheme: light;
      }
      
      /* Ensure all text in Tally forms is visible */
      .tally-form-container,
      .tally-form-container *,
      .tally-thank-you,
      .tally-thank-you *,
      .tally-success-message,
      .tally-success-message *,
      .tally-confirmation,
      .tally-confirmation * {
        color: #1a1a1a !important;
      }
      
      /* Style thank you message background for better visibility */
      .tally-thank-you,
      .tally-success-message,
      .tally-confirmation {
        background-color: rgba(255, 255, 255, 0.95) !important;
        padding: 1.5rem !important;
        border-radius: 0.5rem !important;
        margin: 1rem 0 !important;
      }
      
      /* Ensure form inputs have proper contrast */
      .tally-form input,
      .tally-form textarea,
      .tally-form select {
        background-color: rgba(255, 255, 255, 0.9) !important;
        color: #1a1a1a !important;
        border: 1px solid #d1d5db !important;
      }
      
      /* Style form labels and text */
      .tally-form label,
      .tally-form p,
      .tally-form div {
        color: #1a1a1a !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup script and styles on component unmount
      const existingScript = document.querySelector(
        'script[src="https://tally.so/widgets/embed.js"]'
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }

      // Remove custom styles
      const customStyles = document.querySelectorAll("style");
      customStyles.forEach((styleEl) => {
        if (
          styleEl.textContent &&
          styleEl.textContent.includes("tally-form-container")
        ) {
          document.head.removeChild(styleEl);
        }
      });
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pt-20 px-8 max-w-4xl mx-auto"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold mb-8"
      >
        Contact Me
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-300 mb-12 max-w-2xl"
      >
        Feel free to get in touch with me using the form below or the contact
        information provided.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-16 p-6 rounded-lg border border-gray-700 bg-white backdrop-blur-sm"
      >
        <iframe
          data-tally-src="https://tally.so/embed/w2YqgM?alignLeft=1&hideTitle=1&transparentBackground=0&dynamicHeight=1&theme=light"
          loading="lazy"
          width="100%"
          height="500"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Contact form"
          className="rounded-lg"
        ></iframe>
      </motion.div>
      {/* <motion.form
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
      </motion.form> */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
        <div className="space-y-4 text-gray-300">
          <div className="flex items-center space-x-3">
            <span className="text-orange-500 font-medium">Email:</span>
            <a
              href="mailto:sharmaakshaykumar7807@gmail.com"
              className="hover:text-orange-500 transition-colors"
            >
              sharmaakshaykumar7807@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-orange-500 font-medium">Phone:</span>
            <a
              href="tel:+918209332962"
              className="hover:text-orange-500 transition-colors"
            >
              +91-8209332962
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-blue-500 text-xl" />
              <p className="text-gray-700">+123 456 7890</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-red-500 text-xl" />
              <p className="text-gray-700">support@worktrackpro.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-green-500 text-xl" />
              <p className="text-gray-700">123 Business St, Tech City</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

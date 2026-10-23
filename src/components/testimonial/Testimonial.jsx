import one from "../../assets/portrait-business-woman-office.jpg";
import two from "../../assets/portrait-young-man-with-bulb-idea-concept.jpg";
import three from "../../assets/serious-man-formal-jacket-tie-standing-camera.jpg";
const Testimonial = () => {
  return (
    <div>
      <div>
        <div className=" py-12 my-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Section Title */}
            <h2 className="text-4xl font-bold text-gray-800 mb-3 relative">
              TESTIMONIALS
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-gray-200 text-8xl font-bold -z-10">
                T
              </span>
            </h2>
            <p className="text-gray-600 mt-2 mb-8 w-8/12 mx-auto">
              We offer advanced tools to streamline employee management, boost
              productivity, simplify workflows, and enhance workplace
              collaboration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-[#79554833] p-6 shadow-lg rounded-lg">
                <img
                  src={one.src}
                  alt="Albert Webb"
                  className="w-16 h-16 mx-auto object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-[#795548] ">
                  Albert Webb
                </h3>
                <p className="text-gray-500 text-sm">Regular Client</p>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  Verbonix is made up of friendly and helpful people. What I
                  most appreciated is their team. They are very competent and
                  kind. In fact, they were ready to reply in detail to every
                  question.
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#79554833] p-6 shadow-lg rounded-lg">
                <img
                  src={two.src}
                  alt="Kelly McMillan"
                  className="w-16 h-16 mx-auto object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-[#795548] ">
                  Kelly McMillan
                </h3>
                <p className="text-gray-500 text-sm">Regular Client</p>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  I’m delighted to be working with Verbonix. Their team turns
                  around projects on time and with accuracy, taking into account
                  the context. All their projects have been delivered on time.
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#79554833] p-6 shadow-lg rounded-lg">
                <img
                  src={three.src}
                  alt="Harold Barnett"
                  className="w-16 h-16 mx-auto object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-[#795548] ">
                  Harold Barnett
                </h3>
                <p className="text-gray-500 text-sm">Regular Client</p>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  This company has been an integral part of our company’s
                  success. They have provided outstanding solutions for both
                  technical translation and corporate English courses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

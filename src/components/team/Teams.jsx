// import React from "react";
import img1 from "../../assets/handsome-bearded-guy-posing-against-white-wall.jpg";
import img2 from "../../assets/handsome-smiling-man-looking-with-disbelief.jpg";
import img3 from "../../assets/young-bearded-man-with-striped-shirt.jpg";
const Teams = () => {
  return (
    <div>
      <section className="team-and-founder pb-20 pt-10 ">
        <div className="container mx-auto text-center px-6">
          {/* Section Heading */}
          <h2 className="text-4xl font-bold text-gray-800 mb-3 animate-fadeIn">
            Meet Our Team & Founders
          </h2>
          <p className=" text-gray-600 w-8/12 mx-auto mb-12 animate-fadeIn animation-delay-100">
            Our team is driven by a passion to innovate and create impactful
            solutions. Get to know the talented individuals behind WorkTrackPro.
          </p>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Founder */}
            <div className="team-member bg-[#79554833] p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 animate-slideUp">
              <img
                src={img1.src}
                alt="Founder"
                className="w-32 h-32 object-cover mx-auto rounded-full mb-6"
              />
              <h3 className="text-2xl font-semibold  mb-2">John Doe</h3>
              <p className="text-gray-500 mb-4">Founder & CEO</p>
              <p className="text-gray-600">
                John is the visionary behind WorkTrackPro, bringing over 10
                years of experience in tech and entrepreneurship.
              </p>
            </div>

            {/* Team Member 1 */}
            <div className="team-member bg-[#79554833] p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 animate-slideUp animation-delay-200">
              <img
                src={img2.src}
                alt="Team Member 1"
                className="w-32 h-32 object-cover mx-auto rounded-full mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Jane Smith
              </h3>
              <p className="text-gray-500 mb-4">Chief Technology Officer</p>
              <p className="text-gray-600">
                Jane leads the tech team, ensuring that we are always on the
                cutting edge of innovation and software development.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="team-member bg-[#79554833] p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 animate-slideUp animation-delay-300">
              <img
                src={img3.src}
                alt="Team Member 2"
                className="w-32 h-32 object-cover mx-auto rounded-full mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Alice Johnson
              </h3>
              <p className="text-gray-500 mb-4">Head of Product</p>
              <p className="text-gray-600">
                Alice is passionate about user experience and product design,
                making sure WorkTrackPro is intuitive and user-friendly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Teams;

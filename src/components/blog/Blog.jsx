import one from "../../assets/businessman-suit-working-tablet-with-charts-conference-room-team-brainstorm.jpg";
import two from "../../assets/confident-business-people-standing-board-meeting.jpg";
const Blog = () => {
  return (
    <div >
      <h2 className="text-4xl font-bold mb-4 mx-auto text-center">
        Our Blog & News
      </h2>
      <p className="text-gray-600 mb-6 mx-auto text-center">
        Discover the latest insights and trends in education, technology, and
        career development.
      </p>
      <div className="bg-[#79554833] p-8 mb-20 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <img
              src={one.src}
              alt="Blog Post 1"
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              The Future of Online Learning
            </h3>
            <p className="text-gray-600 text-sm">March 18, 2022</p>
            <p className="text-gray-500 text-xs">No Comments</p>
            <p className="text-gray-700 mt-2">
              Explore the latest trends in online education, including
              AI-powered learning and personalized learning experiences.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <img
              src={two.src}
              alt="Blog Post 2"
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              Top Tips for Job Interview Success
            </h3>
            <p className="text-gray-600 text-sm">March 18, 2022</p>
            <p className="text-gray-500 text-xs">No Comments</p>
            <p className="text-gray-700 mt-2">
              Learn valuable strategies for acing your next job interview and
              landing your dream role.
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <a href="/blog/all-blogs">
            <button className="bg-[#795548]   text-white font-semibold px-4 py-2 rounded-md">
              See All
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog;

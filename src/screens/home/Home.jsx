"use client";

import { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import Blog from "../../components/blog/Blog";
import Faqs from "../../components/faq/Faqs";
import Job from "../../components/job/Job";
import Service from "../../components/service/Service";
import Teams from "../../components/team/Teams";
import Testimonial from "../../components/testimonial/Testimonial";
import Workflow from "../../components/workflow/Workflow";
// import PopularChart from "../char/PopularChart";
// import Charts from "../char/PopularChart";
import AOS from "aos";
const Home = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 650 });
  }, []);

  return (
    <div>
      <Banner></Banner>
      <div className="w-11/12 mx-auto">
        <Workflow />
        <div data-aos="fade-up">
          <Teams></Teams>
        </div>
        <div data-aos="fade-left">
          <Job></Job>
        </div>
        <div id="services" data-aos="fade-right">
          <Service></Service>
        </div>
        <div data-aos="fade-up">
          <Testimonial ></Testimonial>
        </div>
        {/* <Features></Features> */}
        <div id="blogs" data-aos="fade-up-right">
          <Blog></Blog>
        </div>
        <div data-aos="fade-up-left">
          <Faqs></Faqs>
        </div>
      </div>
      {/* <PopularChart></PopularChart> */}
    </div>
  );
};

export default Home;

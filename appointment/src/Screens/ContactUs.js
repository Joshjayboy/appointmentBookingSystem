import React from "react";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import Layout from "../Layout/Layout";
import Head from "../Components/Head";

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: "Email Us",
      info: "book an appointment",
      icon: FiMail,
      contact: "booking@gamil.com",
      description: "This is an Appointement Booking System",
    },
    {
      id: 2,
      title: "Call Us",
      info: "place a call today",
      icon: FiPhoneCall,
      contact: "+234 816 064 1688",
      description: "Phone calls is also available ",
    },

    {
      id: 3,
      title: "Location",
      info: "UK",
      icon: FiMapPin,
      contact: "",
      description: "Our Location is ",
    },
  ];
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="Contact Us" />
        <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border-border flex-colo p-10 bg-subMain rounded-lg text-center"
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-text leading-7">
                {item.description}{" "}
                <a href={`mailto:${item.contact}`} className="text-black">
                  {item.info}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;

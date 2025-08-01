import React from "react";
import SubContainer from "../components/SubContainer";

export default function About() {
  return (
    <div>
      {/* Breadcrumb Header */}
      <SubContainer title="About Us" />

      {/* Main Content */}
      <div className="py-20 border-t-2 text-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 ">About Us</h2>
              <div className="prose prose-invert max-w-none space-y-6">
                <div className="bg-blue-500 p-6 rounded-xl">
                  <p className="text-black/70 font-semibold italic">
                    At Flego innovation, we're not just a tech company; we're
                    innovators with a vision to redefine the way people interact
                    with technology.
                  </p>
                </div>
                <p className="text-black/70">
                  Our mission is to enhance the power of innovation and
                  technology to enrich lives and create a sustainable world to
                  live in.
                </p>

                <p className="text-black/70">
                  Our vision is to be a leading innovative software company and
                  progress in our current position in the market. We believe
                  that our stakeholders' growth is our growth, and we are
                  committed to helping them achieve their goals. Sustainability
                  is at the core of everything we do. We strive to be known as a
                  reliable, innovative, and user-friendly technological service
                  provider in the industry.
                </p>

                <p className="text-black/70">
                  Enhancing the power of innovation and technology to enrich
                  people's lives and create a sustainable world to live in.
                </p>

                <p className="text-black/70">
                  At Flego innovation, we are passionate about leveraging the
                  latest advancements in technology to solve real-world problems
                  and make a positive impact on society. With a focus on
                  innovation, reliability, and user-friendliness, we aim to
                  exceed expectations and set new standards in the industry.
                </p>

                <p className="text-black/70">
                  Whether it's developing cutting-edge software solutions,
                  providing top-notch technological services, or fostering a
                  culture of sustainability, Flego innovation is dedicated to
                  driving progress and making a difference. Join us on our
                  journey to a brighter, more connected future.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-float">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

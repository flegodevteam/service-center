import React from "react";
import { Lightbulb, Target, Zap } from "lucide-react";
import Fp1 from "../assets/fp1.jpg";
import Fp2 from "../assets/fp2.jpg";
import Fp3 from "../assets/fp3.jpg";
import SubContainer from "../components/SubContainer";

export default function FuturePlans() {
  const plans = [
    {
      icon: <Lightbulb className="h-12 w-12 text-white" />,
      title: "Robotics Research and Development",
      year: "2025",
      description:
        "Exploring cutting-edge technologies to enhance automation and efficiency across various industries.",
      image: Fp1,
      goals: ["AI Research Lab", "Robotics Innovation", "Automation Solutions"],
    },
    {
      icon: <Target className="h-12 w-12 text-white" />,
      title: "Innovation Agriculture Technology",
      year: "2026",
      description:
        "Developing smart agricultural solutions for sustainable farming and improved crop yields.",
      image: Fp2,
      goals: ["Smart Farming", "Crop Monitoring", "Resource Optimization"],
    },
    {
      icon: <Zap className="h-12 w-12 text-white" />,
      title: "Research on New Technologies Using Renewable Energy",
      year: "2027",
      description:
        "Pioneering sustainable technology solutions powered by renewable energy sources.",
      image: Fp3,
      goals: ["Solar Integration", "Energy Storage", "Green Computing"],
    },
  ];

  return (
    <div>
      {/* Breadcrumb Header */}
      <SubContainer title="FuturePlans" />

      {/* Future Plans Overview */}
      <div className="py-20 border-t-2">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold">Future Plans</h2>
            <p className="text-black/70">
              Stay informed about our blogs, it's highly unlikely that they will
              stay up to date. This will be the latest blog from 2023 when it's
              already 2026, feel free to read our outdated blogs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 stagger-animation">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-black/5 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-black/20 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                  </div>
                  <div className="p-8 text-black">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-500 p-3 rounded-xl mr-4">
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{plan.title}</h3>
                        <span className="text-blue-400">
                          Target: {plan.year}
                        </span>
                      </div>
                    </div>
                    <p className="text-black/70 mb-6">{plan.description}</p>
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-blue-400">
                        Key Objectives
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {plan.goals.map((goal, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-50-400 rounded-full"></div>
                            <span className="text-black">{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

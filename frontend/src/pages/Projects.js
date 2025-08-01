import React from "react";
import { Link } from "react-router-dom";
import { Code2, Rocket, GitBranch, ArrowRight } from "lucide-react";
import SubContainer from "../components/SubContainer";

export default function Projects() {
  const projects = [
    {
      icon: <Code2 className="h-12 w-12 text-white" />,
      title: "Ko Sri Solutions",
      description:
        "Ko Sri Solutions specializes in logistics services bridging Korea and Sri Lanka. With a profound understanding of both markets, they offer customized solutions for efficient transportation of goods between these two countries.",
      image:
        "https://images.unsplash.com/photo-1566232392379-afd9298e6a46?auto=format&fit=crop&q=80&w=800",
      tech: ["Logistics", "Supply Chain", "International Trade"],
      status: "Deployed",
    },
    {
      icon: <Rocket className="h-12 w-12 text-white" />,
      title: "Business Management System",
      description:
        "Step into the future of business management with Lanka Bill - your ultimate solution for seamless operations and soaring success. This cutting-edge platform manages invoices, sales, payments and everything to manage your business.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      tech: ["ERP", "Financial Management", "Analytics"],
      status: "In Development",
    },
    {
      icon: <GitBranch className="h-12 w-12 text-white" />,
      title: "A/L Helper",
      description:
        "Dive into the world of exam preparation with confidence, as A/L Helper revolutionizes the way you study for your A/L exams. Generate complete, authentic papers featuring MCQs, structured, and essay questions.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      tech: ["Education", "AI", "Assessment"],
      status: "Active",
    },
  ];

  return (
    <div>
      {/* Breadcrumb Header */}
      <SubContainer title="Projects" />

      {/* Projects Overview */}
      <div className="py-20 border-t-2">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold  mb-6">Our Latest Projects</h2>
            <p className="text-black/70">
              From groundbreaking designs to cutting-edge solutions, our
              portfolio showcases a rich tapestry of imagination brought to
              life. Explore our history of innovation and discover how we've
              transformed ideas into reality, one project at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 stagger-animation">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-black/5 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-black/20 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative h-64 lg:h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-500 p-3 rounded-xl mr-4">
                        {project.icon}
                      </div>
                      <h3 className="text-2xl font-bold ">{project.title}</h3>
                    </div>
                    <p className="text-black/70 mb-6">{project.description}</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-500 rounded-full text-sm text-blue-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-sm font-semibold text-gray-400">
                          Status:{" "}
                          <span className="text-blue-400">
                            {project.status}
                          </span>
                        </span>
                        <Link
                          to={`/contact`}
                          className="inline-flex items-center text-blue-400 hover:text-blue-300"
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
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

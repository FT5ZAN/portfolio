"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import "../styles/IntroAnimation.css";
import Navbar from "../components/Navbar";
import HeroTypingServer from "../components/HeroTypingServer";
import ActionButtons from "@/components/ActionButtons";
import ContactForm from "@/components/ContactForm";
import Card from "@/components/Card";
interface ISkill {
  _id: string;
  name: string;
  level?: "beginner" | "intermediate" | "expert";
  image?: string;
}
interface IProject {
  _id: string;
  title: string;
  description?: string;
  github?: string;
  live?: string;
  image?: string;
  type: "realtime" | "hobby";
}

const IntroAnimation: React.FC = () => {
  // const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorSkills, setErrorSkills] = useState<string | null>(null);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);

  // Fetch skills data
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        setSkills(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);
  //  Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setErrorProjects(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);
  useEffect(() => {
    // Prevent scrolling during animation
    document.body.style.overflow = "hidden";

    // GSAP animation timeline
    const tl = gsap.timeline();

    tl.to(".clip-top", {
      duration: 0.5,
      clipPath: "inset(0 0 0 0)",
      // y: '50%',
      ease: "power4.inOut",
    })
      .to(
        ".clip-bottom",
        {
          duration: 0.5,
          clipPath: "inset(0 0 0 0)",
          // y: '-100%',
          ease: "power4.inOut",
        },
        "-=0.5"
      )
      .to(
        ".marquee",
        {
          duration: 2,
          top: "50%",
          ease: "power4.inOut",
        },
        "-=0.5"
      )
      .to(".clip-top", {
        duration: 1.5,
        clipPath: "inset(100% 0 0 0)",
        ease: "power4.inOut",
        delay: 1,
      })
      .to(
        ".clip-bottom",
        {
          duration: 1.5,
          clipPath: "inset(0 0 100% 0)",
          ease: "power4.inOut",
        },
        "<"
      )
      .to(
        ".clip-center",
        {
          duration: 2,
          opacity: 0,
        },
        "<"
      )
      .to(".loader", {
        duration: 0.5,
        display: "none",
        onComplete: () => {
          document.body.style.overflow = "auto";
          const first = document.querySelector("#first");
          const nav = document.querySelector("nav");
          if (first) first.setAttribute("style", "display: flex");
          if (nav) nav.setAttribute("style", "display: flex");
        },
      })
      .from(
        "nav",
        {
          y: -1500,
          duration: 1.5,
          ease: "power4.inOut",
        },
        "-=0.5"
      )
      .from(
        "#first",
        {
          opacity: 1,
          y: 1500,
          duration: 1,
          ease: "power1.inOut",
        },
        "-=1"
      )
      .from(
        ".parant",
        {
          opacity: 1,
          y: -1500,
          duration: 1.5,
          ease: "power1.inOut",
        },
        "-=1"
      );
    // Cleanup on unmount
    return () => {
      tl.kill();
      document.body.style.overflow = "auto";
    };
  }, []);
  //  Helper to render projects row
  const renderProjectsRow = (type: "realtime" | "hobby") => {
    const filtered = projects.filter((p) => p.type === type);
    if (filtered.length === 0) return <p>No {type} projects found.</p>;

    return (
      <div className="projects-row">
        {filtered.map((p) => (
          <div key={p._id} className="project-card">
            {p.image && (
              <div className="project-image-container">
                <img src={p.image} alt={p.title} className="project-image" />
                <div className="project-overlay">
                  <h3>{p.title}</h3>
                  <div className="map">
                    {p.description && <p>{p.description}</p>}
                  </div>
                </div>
              </div>
            )}
            <div className="arrange">
              {/* <h3>{p.title}</h3>
            {p.description && <p>{p.description}</p>} */}
              <div className="project-links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {/* <br /> */} &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="loader">
        <div className="loader-clip clip-top">
          <div className="marquee">
            <span>HELLO MYSELF</span>
          </div>
        </div>
        <div className="loader-clip clip-center">
          <span>FT FAIZAN</span>
        </div>
        <div className="loader-clip clip-bottom">
          <div className="marquee">
            <span>WELCOME TO MY PORTFOLIO</span>
          </div>
        </div>
      </div>
      <nav>
        <Navbar />
      </nav>
      <div id="first">
        <div className="adjust">
          <div className="parant">
            <div className="child">
              <HeroTypingServer
                name="FT FAIZAN"
                roles={[
                  "Web Developer",
                  "Frontend Developer",
                  "CEO,Founder of toolssaver.com",
                  "Next.js Developer",
                  "React.js Developer",
                ]}
              />
              <ActionButtons />
            </div>
            <div className="child">
              <div className="photo">
                <img
                  src="WhatsApp_Image_2025-01-24_at_19.02.46_2299bdaa-removebg-preview.png"
                  alt="error"
                />
              </div>
            </div>
          </div>
          <div id="outab">
            <div className="head">
              <h1>ABOUT</h1>
            </div>
            <div className="about">
              <div className="about1">
                <h3>WEB-DEV JOURNEY</h3>
                <p>
                  I'm Faizan, a passionate React & Next.js developer with
                  hands-on full-stack experience in Next.js, MongoDB , and
                  modern frameworks. I specialize in building clean, scalable,
                  and user-friendly web applications with a strong SaaS product
                  mindset. I have worked on my own real-time SaaS projects
                  "toolssaver.com" and gained the work flow of real time project
                  experience, which gave me a strong understanding of how the
                  full-stack workflow works—from frontend UI/UX to backend
                  logic, database integration, authentication, and deployment.
                  With a solid foundation in HTML, CSS, JavaScript, React,
                  Next.js, and MongoDB, I focus on creating dynamic and
                  responsive websites that deliver seamless user experiences. I
                  also leverage AI for productivity and innovation, always
                  aiming to integrate user-centric features that make a real
                  impact. My goal is to deliver high-quality digital solutions
                  that not only meet client needs but also enhance usability and
                  engagement. Let's connect and create something amazing
                  together!
                </p>
              </div>
              <div className="about2">
                <h3>QUALIFICATION JOURNEY</h3>
                <ul className="journey-list">
                  <li>
                    <strong>
                      Bachelor of Computer Applications (BCA) thiruvalluvar
                      University islamiah College (autonomous)
                    </strong>{" "}
                    <br />
                    2022 – 2025
                  </li>
                  <li>
                    <strong>Web Development Intern (Aspirasys)</strong> <br />
                    15 days – Nov 25, 2024 to Dec 10, 2024
                  </li>
                  <li>
                    <strong>Real-Time Project Experience</strong> –
                    <a
                      href="https://toolssaver.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      toolssaver.com
                    </a>{" "}
                    <br />
                    July 1, 2025 – July 30, 2025
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="update">
            <div className="head">
              <h1>SKILLS</h1>
            </div>
            <div className="skills">
              {loading ? (
                <div className="skills-loading">
                  <p>Loading skills...</p>
                </div>
              ) : error ? (
                <div className="skills-error">
                  <p>Error loading skills: {error}</p>
                </div>
              ) : (
                <div className="skills-container">
                  {skills.length > 0 ? (
                    <div className="skills-grid">
                      {skills.map((skill) => (
                        <div key={skill._id} className="skill-card">
                          {skill.image && (
                            <div className="skill-image">
                              <img
                                src={skill.image}
                                alt={skill.name}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          )}
                          <div className="skill-info">
                            <h4 className="skill-name">{skill.name}</h4>
                            {skill.level && (
                              <span
                                className={`skill-level level-${skill.level}`}
                              >
                                {skill.level}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No skills found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div id="updates">
            <div className="head">
              <h1>PROJECTS</h1>

              {loadingProjects ? (
                <p>Loading projects...</p>
              ) : errorProjects ? (
                <p>Error: {errorProjects}</p>
              ) : (
                <>
                  <div className="paling">
                    <h2>Realtime </h2>
                    {renderProjectsRow("realtime")}

                    <h2>Hobby </h2>
                    {renderProjectsRow("hobby")}
                  </div>
                </>
              )}
            </div>
          </div>
          <div id="updatrs">
            <div className="head">
              <h1>CONTACT</h1>
            </div>
            <div className="end">
              <div className="end1">
                <ContactForm />
              </div>
              <div className="end1">
                <div className="under">
                  <h2>Mobile Number</h2>
                  <p> +91 6379549131</p>
                  <h2>G-mail</h2>
                  <p> ftfaizan9629@gmail.com</p>
                </div>
              </div>
              <div className="end2">
                <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroAnimation;

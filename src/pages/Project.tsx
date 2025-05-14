import React from "react";
import projects from "../data/projects.json";

interface ProjectProps {
  projectId: string;
}

const Project = ({ projectId }: ProjectProps) => {
  const project = projects.find((project) => project.title === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <img src={project.heroImage} alt={project.title} />
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <ul>
        {project.technologiesUsed.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
      <img src={project.screenshot} alt={project.title} />
      <a href={project.link}>View Project</a>
    </div>
  );
};

export default Project;

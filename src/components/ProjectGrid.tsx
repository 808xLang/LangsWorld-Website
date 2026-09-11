import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </>
  );
}
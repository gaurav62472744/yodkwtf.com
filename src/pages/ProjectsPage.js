import React from 'react';
import { projects } from '../data/data';
import { FaGithub, FaLink } from 'react-icons/fa';
import { NavForPages } from '../components';

// get all projects from data
const { all_projects } = projects;

// COMPONENT
const ProjectsPage = () => {
  // get all unique categories
  const categories = [
    'all',
    ...new Set(all_projects.map((project) => project.category)),
  ];
  // states
  const [projects, setProjects] = React.useState(all_projects);

  // UPDATE FILTER BTNS COLOR
  const updateFilterBtns = (e) => {
    // remove active class from all
    document.querySelectorAll('.category-btn').forEach((btn) => {
      btn.classList.add('unactive');
    });
    // remove unactive and then add active class to clicked btn
    e.target.classList.remove('unactive');
    e.target.classList.add('active');
  };

  // FILTER PROJECTS FUNCTION
  const filterProjects = (category, e) => {
    // update btns
    updateFilterBtns(e);
    // check if all btn is clicked
    if (category === 'all') {
      setProjects(all_projects);
    } else {
      // create new projects array of projects whose category matches clicked category
      const newProjects = all_projects.filter(
        (project) => project.category === category
      );
      setProjects(newProjects);
    }
  };

  // jsx
  return (
    <section className="page">
      {/* navbar */}
      <NavForPages />

      <div className="page-center projects-page">
        {/* title */}
        <div className="section-title page-title">
          <h2>
            my <span>projects</span>
          </h2>
          <div className="underline"></div>
          <p>
            Since I've been creating websites for a while now, there are a lot
            of them. So I decided to put some of my favourite ones here.
            <br />
            However, if you are interested in seeing all my projects then just
            follow me on{' '}
            <a href="https://github.com/yodkwtf" title="My GitHub Profile">
              github
            </a>
            .
          </p>
        </div>

        {/* projects-center */}
        <div className="section-center projects-page-center">
          <Categories categories={categories} filterProjects={filterProjects} />
          <Projects projects={projects} />
        </div>
      </div>
    </section>
  );
};

// Category Btns Component
const Categories = ({ categories, filterProjects }) => {
  return (
    <div className="category-btn-container">
      {categories.map((category, i) => (
        <button
          className="category-btn btn"
          data-category={category}
          key={i}
          onClick={(e) => filterProjects(category, e)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Projects Component
const Projects = ({ projects }) => {
  // sort by name
  projects = projects.sort((a, b) => a.title.localeCompare(b.title));

  // jsx
  return (
    <div className="projects-container">
      {projects.map((project) => (
        <SingleProject project={project} key={project.id} />
      ))}
    </div>
  );
};

// Single Project Component
const SingleProject = ({ project: { title, image, url, repo_url } }) => {
  return (
    <article className="single-project">
      <div className="single-project-img">
        <img src={image} alt={title} className="single-project-image" />
      </div>
      <div className="single-project-info">
        <h4 className="single-project-title">{title}</h4>
        <div className="single-project-footer">
          <a href={url} target="_blank" rel="noreferrer" title="Live Site">
            <strong>
              <FaLink className="fa" /> <span>live</span>
            </strong>
          </a>
          <a
            href={repo_url}
            target="_blank"
            rel="noreferrer"
            title="GitHub Code"
          >
            <FaGithub className="fa" /> <span>code</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectsPage;

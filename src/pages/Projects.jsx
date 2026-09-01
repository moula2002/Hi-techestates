import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');

  const projects = [
    { id: 1, title: 'Green Valley Layout', location: 'Erode, Tamil Nadu', status: 'Completed', image: '/assets/images/img-20.jpg' },
    { id: 2, title: 'Sunrise Apartments', location: 'Salem, Tamil Nadu', status: 'Ongoing', image: '/assets/images/img-21.jpg' },
    { id: 3, title: 'Royal Villas', location: 'Coimbatore, Tamil Nadu', status: 'Completed', image: '/assets/images/img-22.jpg' },
    { id: 4, title: 'Tech Park Commercial', location: 'Bangalore, Karnataka', status: 'Ongoing', image: '/assets/images/img-23.jpg' },
  ];

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'All') return true;
    return project.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* Header / Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-900 mb-2">Our Projects</h1>
          <div className="text-sm text-gray-500 font-medium">
            Home / Projects
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tabs */}
        <div className="mb-12 flex justify-center md:justify-start">
          <div className="flex gap-2">
            {['All', 'Ongoing', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-colors border ${
                  activeTab === tab
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-white text-charcoal-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-charcoal-900 mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 font-medium">
                        <MapPin size={14} className="text-gray-400" />
                        {project.location}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">No projects found</h3>
            <p className="text-gray-500">There are no {activeTab.toLowerCase()} projects at the moment.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Projects;

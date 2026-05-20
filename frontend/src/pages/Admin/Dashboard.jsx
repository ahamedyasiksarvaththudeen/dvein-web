import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FaTrash, FaSignOutAlt, FaPlus, FaEdit, FaTimes, 
    FaGraduationCap, FaBriefcase, FaUsers, FaFileDownload, 
    FaBox, FaCloudUploadAlt, FaSync 
} from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();

    // --- 1. EXISTING STATES (உன்னுடைய ஒரிஜினல் ஸ்டேட்ஸ் - மாற்றப்படவில்லை) ---
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({ title: '', desc: '', iconName: 'FaCode', link: '/services', image: null });
    const [showForm, setShowForm] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [showTrainingForm, setShowTrainingForm] = useState(false);
    const [newTraining, setNewTraining] = useState({ title: '', duration: '', tag: 'Online', category: 'internship', image: null });
    const [stats, setStats] = useState({ jobApps: 0, internApps: 0, services: 0, trainings: 0, products: 0 });
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [showJobForm, setShowJobForm] = useState(false);
    const [jobData, setJobData] = useState({ title: '', department: '', location: 'Chennai (Hybrid)', type: 'Full-time', salary: '', description: '', responsibilities: '', requirements: '' });
    const [selectedIds, setSelectedIds] = useState([]);

    // --- NEW PRODUCT STATES (புதிய வசதிக்காக மட்டும்) ---
    const [products, setProducts] = useState([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const [productData, setProductData] = useState({ name: '', description: '', price: '', version: '1.0', category: 'Software', image: null });
    const [productPreview, setProductPreview] = useState(null);

    // --- SUCCESS STORIES STATES ---
    const [successStories, setSuccessStories] = useState([]);
    const [showStoryForm, setShowStoryForm] = useState(false);
    const [storyData, setStoryData] = useState({ title: '', description: '', videoUrl: '', image: null });
    const [storyPreview, setStoryPreview] = useState(null);

    const fetchData = useCallback(() => {
        const token = localStorage.getItem('adminToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        fetch('http://localhost:5000/api/admin/stats', { headers }).then(res => res.json()).then(data => setStats(data)).catch(err => console.error(err));
        fetch('http://localhost:5000/api/admin/applications', { headers }).then(res => res.json()).then(data => setApplications(data)).catch(err => console.error(err));
        fetch('http://localhost:5000/api/public/services').then(res => res.json()).then(data => setServices(data)).catch(err => console.error(err));
        fetch('http://localhost:5000/api/public/trainings').then(res => res.json()).then(data => setTrainings(data)).catch(err => console.error(err));
        fetch('http://localhost:5000/api/public/jobs').then(res => res.json()).then(data => setJobs(data)).catch(err => console.error(err));
        // Fetch Products
        fetch('http://localhost:5000/api/public/products').then(res => res.json()).then(data => setProducts(data)).catch(err => console.error(err));
        // Fetch Success Stories
        fetch('http://localhost:5000/api/public/success-stories').then(res => res.json()).then(data => setSuccessStories(data)).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) navigate('/admin/login');
        fetchData();
    }, [fetchData, navigate]);

    // --- EXISTING HANDLERS (மாற்றப்படவில்லை) ---
    const handleJobSubmit = async (e) => { e.preventDefault(); const token = localStorage.getItem('adminToken'); const res = await fetch('http://localhost:5000/api/admin/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(jobData) }); if(res.ok) { alert("Job Posted & Emails Synced!"); setShowJobForm(false); fetchData(); } };
    const handleDeleteJob = async (id) => { if(!window.confirm("Delete?")) return; const token = localStorage.getItem('adminToken'); await fetch(`http://localhost:5000/api/admin/jobs/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }); fetchData(); };
    const handleFileChange = (e) => { const file = e.target.files[0]; setFormData({ ...formData, image: file }); };
    const handleSubmit = async (e) => { e.preventDefault(); const token = localStorage.getItem('adminToken'); const data = new FormData(); Object.keys(formData).forEach(key => data.append(key, formData[key])); const url = isEditing ? `http://localhost:5000/api/admin/services/${currentId}` : 'http://localhost:5000/api/admin/services'; await fetch(url, { method: isEditing ? 'PUT' : 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: data }); resetForm(); fetchData(); };
    const handleEdit = (service) => { setIsEditing(true); setCurrentId(service._id); setFormData({ title: service.title, desc: service.desc, iconName: service.iconName, link: service.link, image: null }); setShowForm(true); window.scrollTo(0,0); };
    const handleDelete = async (id) => { if(!window.confirm("Delete?")) return; const token = localStorage.getItem('adminToken'); await fetch(`http://localhost:5000/api/admin/services/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }); fetchData(); };
    const resetForm = () => { setFormData({ title: '', desc: '', iconName: 'FaCode', link: '/services', image: null }); setIsEditing(false); setShowForm(false); };
    const handleAddTraining = async (e) => { e.preventDefault(); const token = localStorage.getItem('adminToken'); const data = new FormData(); Object.keys(newTraining).forEach(key => data.append(key, newTraining[key])); const res = await fetch('http://localhost:5000/api/admin/training', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: data }); if(res.ok) { setShowTrainingForm(false); fetchData(); } };
    const handleDeleteTraining = async (id) => { if(!window.confirm("Delete?")) return; const token = localStorage.getItem('adminToken'); await fetch(`http://localhost:5000/api/admin/training/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }); fetchData(); };
    const toggleSelect = (id) => { setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]); };
    const handleSelectAll = () => { if (selectedIds.length === applications.length) setSelectedIds([]); else setSelectedIds(applications.map(app => app._id)); };
    const handleDeleteApp = async (id) => { if (!window.confirm("Delete?")) return; const token = localStorage.getItem('adminToken'); await fetch(`http://localhost:5000/api/admin/applications/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }); fetchData(); };
    const handleBulkDelete = async () => { if (!window.confirm("Bulk Delete?")) return; const token = localStorage.getItem('adminToken'); await fetch(`http://localhost:5000/api/admin/bulk-delete`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ ids: selectedIds }) }); setSelectedIds([]); fetchData(); };
    const handleLogout = () => { localStorage.clear(); navigate('/admin/login'); };

    // --- SUCCESS STORY HANDLERS ---
    const handleStorySubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        const data = new FormData();
        data.append('title', storyData.title);
        data.append('description', storyData.description);
        data.append('videoUrl', storyData.videoUrl);
        if (storyData.image) data.append('image', storyData.image);
        const res = await fetch('http://localhost:5000/api/admin/success-stories', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: data });
        if (res.ok) { setShowStoryForm(false); setStoryData({ title: '', description: '', videoUrl: '', image: null }); setStoryPreview(null); fetchData(); }
    };
    const handleDeleteStory = async (id) => {
        if (!window.confirm('Delete this story?')) return;
        const token = localStorage.getItem('adminToken');
        await fetch(`http://localhost:5000/api/admin/success-stories/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        fetchData();
    };

    // --- NEW PRODUCT HANDLERS (புதியது) ---
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        const data = new FormData();
        Object.keys(productData).forEach(key => data.append(key, productData[key]));
        const res = await fetch('http://localhost:5000/api/admin/products', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: data });
        if(res.ok) { alert("Product Activated!"); setShowProductForm(false); setProductPreview(null); fetchData(); }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-20 text-sm">
                <h1 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Admin Dashboard</h1>
                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition"><FaSignOutAlt /> Logout</button>
            </nav>

            <div className="max-w-7xl mx-auto p-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <StatCard title="Job Apps" count={stats.jobApps} icon={<FaBriefcase/>} color="bg-blue-600" />
                    <StatCard title="Intern Apps" count={stats.internApps} icon={<FaUsers/>} color="bg-blue-600" />
                    <StatCard title="Services" count={stats.services} icon={<FaBriefcase/>} color="bg-emerald-600" />
                    <StatCard title="Products" count={products.length} icon={<FaBox/>} color="bg-orange-600" />
                </div>

                {/* === 📦 NEW PRODUCT MANAGEMENT SECTION === */}
                <div className="mb-16 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">Product Ecosystem</h2>
                        <button onClick={() => setShowProductForm(!showProductForm)} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-200">
                            {showProductForm ? <FaTimes /> : <FaPlus />} Activate Product
                        </button>
                    </div>

                    {showProductForm && (
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-10 text-xs animate-fadeIn">
                            <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required className="p-3 rounded-xl outline-none border border-slate-200" placeholder="Product Name" onChange={e => setProductData({...productData, name: e.target.value})} />
                                <input required className="p-3 rounded-xl outline-none border border-slate-200" placeholder="Version" onChange={e => setProductData({...productData, version: e.target.value})} />
                                <input required className="p-3 rounded-xl outline-none border border-slate-200" placeholder="Price ($/mo)" onChange={e => setProductData({...productData, price: e.target.value})} />
                                <input type="file" required className="p-2" onChange={e => {setProductData({...productData, image: e.target.files[0]}); setProductPreview(URL.createObjectURL(e.target.files[0]))}} />
                                <textarea required className="p-3 rounded-xl outline-none border border-slate-200 md:col-span-2" placeholder="Description" rows="2" onChange={e => setProductData({...productData, description: e.target.value})} />
                                {productPreview && <img src={productPreview} alt="prev" className="h-20 w-20 object-cover rounded-lg shadow-sm" />}
                                <button className="bg-black text-white rounded-xl font-black uppercase tracking-widest py-3 md:col-span-2 flex items-center justify-center gap-2"><FaSync /> Sync Product to Hub</button>
                            </form>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map(prod => (
                            <div key={prod._id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group relative overflow-hidden">
                                <div className="h-32 bg-white rounded-xl overflow-hidden mb-4 border border-white shadow-inner">
                                    {prod.image && <img src={prod.image} className="w-full h-full object-cover" alt=""/>}
                                </div>
                                <h4 className="font-bold text-gray-800 text-xs">{prod.name}</h4>
                                <p className="text-[10px] text-gray-400 font-black uppercase">v{prod.version} • {prod.price}</p>
                                <button onClick={async () => { if(window.confirm("Delete?")) { await fetch(`http://localhost:5000/api/admin/products/${prod._id}`, { method: 'DELETE', headers: {'Authorization': `Bearer ${localStorage.getItem('adminToken')}`} }); fetchData(); } }} className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition"><FaTrash size={10}/></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Careers Management (உன்னுடைய ஒரிஜினல் - மாற்றப்படவில்லை) */}
                <div className="mb-16 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">Careers Management</h2>
                        {!showJobForm && (
                            <button onClick={() => setShowJobForm(true)} className="bg-black text-white px-5 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2"><FaPlus /> Post a Job</button>
                        )}
                    </div>
                    {showJobForm && (
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-10 animate-fadeIn text-xs">
                            <form onSubmit={handleJobSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <input required className="p-3 rounded-xl outline-none" placeholder="Title" onChange={e => setJobData({...jobData, title: e.target.value})} />
                                <input required className="p-3 rounded-xl outline-none" placeholder="Department" onChange={e => setJobData({...jobData, department: e.target.value})} />
                                <input required className="p-3 rounded-xl outline-none" placeholder="Salary Range" onChange={e => setJobData({...jobData, salary: e.target.value})} />
                                <textarea required className="p-3 rounded-xl outline-none lg:col-span-3" placeholder="About the Role" rows="2" onChange={e => setJobData({...jobData, description: e.target.value})} />
                                <button className="bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest py-3 lg:col-span-3">Deploy Role</button>
                            </form>
                            <button onClick={() => setShowJobForm(false)} className="mt-4 text-slate-400 font-bold uppercase tracking-widest">Cancel</button>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {jobs.map(job => (
                            <div key={job._id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center group">
                                <div><h4 className="font-bold text-slate-800 text-xs">{job.title}</h4><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{job.department}</p></div>
                                <button onClick={() => handleDeleteJob(job._id)} className="text-slate-300 hover:text-red-500"><FaTrash size={12}/></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Applicants Section (உன்னுடைய ஒரிஜினல் - மாற்றப்படவில்லை) */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-16 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Recent Applicants</h2>
                        {selectedIds.length > 0 && (
                            <button onClick={handleBulkDelete} className="bg-red-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 transition animate-fadeIn">
                                <FaTrash /> Delete Selected ({selectedIds.length})
                            </button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="text-gray-400 uppercase border-b pb-4">
                                    <th className="pb-4 w-10">
                                        <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === applications.length && applications.length > 0} className="rounded accent-blue-600 cursor-pointer" />
                                    </th>
                                    <th className="pb-4">Candidate</th>
                                    <th className="pb-4">Applied For</th>
                                    <th className="pb-4">Portfolio</th>
                                    <th className="pb-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {applications.map(app => (
                                    <tr key={app._id} className={`hover:bg-gray-50 transition group ${selectedIds.includes(app._id) ? 'bg-blue-50/30' : ''}`}>
                                        <td className="py-4">
                                            <input type="checkbox" checked={selectedIds.includes(app._id)} onChange={() => toggleSelect(app._id)} className="rounded accent-blue-600 cursor-pointer" />
                                        </td>
                                        <td className="py-4 font-bold text-gray-700">{app.firstName} {app.lastName}</td>
                                        <td className="py-4"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{app.jobTitle}</span></td>
                                        <td className="py-4">
                                            {app.portfolio ? <a href={app.portfolio} target="_blank" className="text-blue-500 font-bold hover:underline">Link</a> : <span className="text-gray-300">N/A</span>}
                                        </td>
                                        <td className="py-4 text-right flex items-center justify-end gap-4">
                                            <a href={`http://localhost:5000/${app.resumePath}`} target="_blank" rel="noreferrer" className="text-blue-600 font-bold flex items-center gap-1"><FaFileDownload /> RESUME</a>
                                            <button onClick={() => handleDeleteApp(app._id)} className="text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Services Section (உன்னுடைய ஒரிஜினல் - மாற்றப்படவில்லை) */}
                <div className="mb-16 border-b border-gray-200 pb-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Live Services ({services.length})</h2>
                        {!showForm && <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold uppercase text-[10px] tracking-widest"><FaPlus /> New Service</button>}
                    </div>
                    {showForm && (
                        <div className="bg-white p-8 rounded-2xl shadow-xl mb-12 border border-gray-200 relative animate-fadeIn text-xs">
                            <button onClick={resetForm} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><FaTimes/></button>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required value={formData.title} className="p-3 border rounded-xl" placeholder="Title" onChange={e => setFormData({...formData, title: e.target.value})} />
                                <input required value={formData.iconName} className="p-3 border rounded-xl" placeholder="Icon (FaCode)" onChange={e => setFormData({...formData, iconName: e.target.value})} />
                                <textarea required value={formData.desc} className="p-3 border rounded-xl md:col-span-2" placeholder="Description" rows="2" onChange={e => setFormData({...formData, desc: e.target.value})} />
                                <input type="file" className="text-[10px]" onChange={handleFileChange} />
                                <button className="bg-blue-600 text-white rounded-xl font-bold py-3 uppercase tracking-widest">Publish Service</button>
                            </form>
                        </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {services.map(s => (
                            <div key={s._id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative group">
                                <div className="h-24 bg-gray-50 rounded-lg overflow-hidden mb-2">{s.image && <img src={s.image} className="w-full h-full object-cover" alt=""/>}</div>
                                <h4 className="font-bold text-gray-800 text-[11px] truncate">{s.title}</h4>
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(s)} className="bg-white p-1 rounded-full text-blue-600 shadow"><FaEdit/></button>
                                    <button onClick={() => handleDelete(s._id)} className="bg-white p-1 rounded-full text-red-500 shadow"><FaTrash/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Success Stories Section */}
                <div className="mb-16 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">Our Success Story ({successStories.length})</h2>
                        <button onClick={() => setShowStoryForm(!showStoryForm)} className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-200">
                            {showStoryForm ? <FaTimes /> : <FaPlus />} Add Story
                        </button>
                    </div>

                    {showStoryForm && (
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-10 text-xs animate-fadeIn">
                            <form onSubmit={handleStorySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required className="p-3 rounded-xl outline-none border border-slate-200" placeholder="Title (e.g. John's Placement at Google)" value={storyData.title} onChange={e => setStoryData({...storyData, title: e.target.value})} />
                                <input className="p-3 rounded-xl outline-none border border-slate-200" placeholder="Video URL (YouTube embed, optional)" value={storyData.videoUrl} onChange={e => setStoryData({...storyData, videoUrl: e.target.value})} />
                                <textarea required className="p-3 rounded-xl outline-none border border-slate-200 md:col-span-2" placeholder="Description / story text" rows="3" value={storyData.description} onChange={e => setStoryData({...storyData, description: e.target.value})} />
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Image (optional)</label>
                                    <input type="file" accept="image/*" className="p-2 text-[10px]" onChange={e => { setStoryData({...storyData, image: e.target.files[0]}); setStoryPreview(URL.createObjectURL(e.target.files[0])); }} />
                                    {storyPreview && <img src={storyPreview} alt="preview" className="h-20 w-20 object-cover rounded-lg shadow-sm mt-1" />}
                                </div>
                                <button type="submit" className="bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest py-3 flex items-center justify-center gap-2 self-end"><FaPlus /> Publish Story</button>
                            </form>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {successStories.map(story => (
                            <div key={story._id} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden group relative">
                                {story.videoUrl ? (
                                    <div className="w-full aspect-video bg-black">
                                        <iframe src={story.videoUrl} className="w-full h-full" allowFullScreen title={story.title} />
                                    </div>
                                ) : story.image ? (
                                    <div className="h-36 overflow-hidden">
                                        <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="h-20 bg-indigo-50 flex items-center justify-center text-indigo-300 text-3xl">📸</div>
                                )}
                                <div className="p-4">
                                    <h4 className="font-bold text-slate-800 text-xs mb-1">{story.title}</h4>
                                    <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">{story.description}</p>
                                </div>
                                <button onClick={() => handleDeleteStory(story._id)} className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition"><FaTrash size={10}/></button>
                            </div>
                        ))}
                        {successStories.length === 0 && <p className="text-slate-400 text-xs col-span-3 py-4">No stories yet. Add one above.</p>}
                    </div>
                </div>

                {/* Trainings Section (உன்னுடைய ஒரிஜினல் - மாற்றப்படவில்லை) */}
                <div className="pb-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Training Modules ({trainings.length})</h2>
                        {!showTrainingForm && <button onClick={() => setShowTrainingForm(true)} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold uppercase text-[10px] tracking-widest"><FaPlus /> New Training</button>}
                    </div>
                    {showTrainingForm && (
                        <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-xl mb-12 animate-fadeIn relative text-xs">
                            <button onClick={() => setShowTrainingForm(false)} className="absolute top-4 right-4 text-gray-400"><FaTimes/></button>
                            <form onSubmit={handleAddTraining} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required value={newTraining.title} className="p-3 border rounded-xl" placeholder="Title" onChange={e => setNewTraining({...newTraining, title: e.target.value})} />
                                <input required value={newTraining.duration} className="p-3 border rounded-xl" placeholder="Duration" onChange={e => setNewTraining({...newTraining, duration: e.target.value})} />
                                <button className="bg-blue-600 text-white rounded-xl font-bold py-3 uppercase tracking-widest md:col-span-2">Save Program</button>
                            </form>
                        </div>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {trainings.map(t => (
                            <div key={t._id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative group">
                                <div className="h-24 bg-gray-50 rounded-lg overflow-hidden mb-2">{t.image && <img src={t.image} className="w-full h-full object-cover" alt=""/>}</div>
                                <h4 className="font-bold text-gray-800 text-[11px] truncate">{t.title}</h4>
                                <button onClick={() => handleDeleteTraining(t._id)} className="absolute top-2 right-2 bg-white p-1 rounded-full text-red-500 shadow opacity-0 group-hover:opacity-100 transition-opacity"><FaTrash/></button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

const StatCard = ({ title, count, icon, color }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-5 transition hover:shadow-xl cursor-default group">
        <div className={`${color} text-white p-4 rounded-2xl text-2xl shadow-lg group-hover:scale-110 transition-transform`}>{icon}</div>
        <div><p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{title}</p><h3 className="text-2xl font-black text-gray-800">{count}</h3></div>
    </div>
);

export default Dashboard;

import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';

const products = [
  { id: 1, name: "Premium Indigo Cotton", price: "Bulk Only", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  { id: 2, name: "Sunset Orange Silk", price: "Bulk Only", img: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
  { id: 3, name: "Forest Green Linen", price: "Bulk Only", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" },
];

const Shop = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Material Gallery</h2>
          <p className="text-slate-500 mt-2 text-lg italic">Explore our world-class textile textures.</p>
        </div>
        <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold">View Full Catalog</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map(p => (
          <div key={p.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-lg">
              <img src={p.img} alt={p.name} className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white p-4 rounded-full text-slate-900 hover:bg-blue-600 hover:text-white transition-colors"><Eye /></button>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center px-2">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{p.name}</h3>
                <p className="text-blue-600 font-semibold">{p.price}</p>
              </div>
              <button className="bg-slate-100 p-3 rounded-xl hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all">
                <ShoppingCart size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
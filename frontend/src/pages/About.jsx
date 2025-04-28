import React from 'react';

const About = () => {
  return (
    <div className="bg-pink-50 min-h-screen flex flex-col items-center justify-center p-8">
      <section className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-6">About Traditional Finds</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          At <span className="font-semibold text-pink-600">Traditional Finds</span>, we are passionate about preserving, celebrating, 
          and sharing the beauty of traditional crafts from around the world. 
          Every item you discover here holds a story — a story of culture, craftsmanship, and heritage passed down through generations.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to connect artisans with people who appreciate authenticity and tradition. 
              We aim to provide a platform where cultural artistry is not just sold, but truly valued.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">What We Offer</h2>
            <p className="text-gray-600">
              From handwoven fabrics and intricate wood carvings to traditional jewelry and home decor, 
              we bring you pieces that reflect rich histories and vibrant communities.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Join Us</h2>
          <p className="text-gray-600">
            Become part of our journey to keep traditions alive. Explore our collections, support local artisans, 
            and celebrate the timeless art of handmade creations.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;

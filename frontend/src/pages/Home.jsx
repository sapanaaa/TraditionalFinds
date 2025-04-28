import React, { useEffect, useState } from 'react';
import SplitText from '../components/SplitText';
import Navbar from '../components/Navbar';// Import Navbar here
import BlurText from '../components/BlurText';


const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
const Home = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Kurti for Holi (Buy One Get One Free)",
      price: 25.00,
      imageUrl: "/images/kurti.jpg",
    },
    {
      id: 2,
      name: "Traditional Weaving",
      price: 45.00,
      imageUrl: "/images/kurti.jpg",
    },
    {
      id: 3,
      name: "Wooden Carving",
      price: 60.00,
      imageUrl: "/images/kurti.jpg",
    },
    {
      id: 4,
      name: "Handcrafted Jewelry",
      price: 80.00,
      imageUrl: "/images/kurti.jpg",
    },
  ]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://your-backend.com/api/products'); // Replace with your backend
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    // fetchProducts(); // Uncomment when backend ready
  }, []);

  return (
    <div className="bg-red-100 min-h-screen">
      
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
        style={{ backgroundImage: "url('/path-to-your-hero-image.jpg')" }}
      >
        <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center">
          <SplitText
            text="Welcome to Traditional Finds"
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            delay={50}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
          />

          
                

          <BlurText
  text="Discover authentic crafts and traditional treasures. "
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-2xl mb-8"
/>
          <a
            href="/shop"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-lg">${product.price}</p>
                <a
                  href={`/product/${product.id}`}
                  className="text-pink-500 hover:underline font-semibold"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-pink-600 mb-6">About Us</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            At Traditional Finds, we are passionate about preserving and promoting traditional crafts from around the world.
            Every product tells a story — a story of culture, heritage, and craftsmanship passed down through generations.
            We invite you to celebrate authenticity with us.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

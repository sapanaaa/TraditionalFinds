import React, { useEffect, useState } from 'react';
import SplitText from '../components/SplitText'; // adjust the path according to your folder structure


const Home = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Kurti for holi(buy one get one free)",
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
        const response = await fetch('https://your-backend.com/api/products'); // Replace later with your backend
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    // fetchProducts();  // Uncomment this when your backend is ready
  }, []);

  return (
    <div className="bg-red-100/100">
      {/* Hero Section */}
      <section
  className="bg-cover bg-center h-[500px] flex items-center justify-center text-white"
  style={{ backgroundImage: "url('/path-to-your-hero-image.jpg')" }}
>
  <div className="text-center">
    <SplitText
      text="Welcome to Traditional Finds"
      className="text-4xl md:text-6xl font-bold mb-4"
      delay={50}
      animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
      animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
      easing="easeOutCubic"
      textAlign="center"
    />
    <SplitText
      text="Discover the finest traditional crafts and handmade treasures."
      className="text-lg md:text-xl mb-6"
      delay={30}
      animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
      animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
      easing="easeOutCubic"
      textAlign="center"
    />
    <a href="/shop" className="bg-red-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-600 transition">
      Shop Now
    </a>
  </div>
</section>


      {/* Featured Products Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 hover:text-pink-500">${product.price}</p>
                <a href={`/product/${product.id}`} className="text-red-400 hover:underline">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-700">
            At Traditional Finds, we are passionate about preserving and promoting traditional crafts from around the world.
            Every product is a story of culture, heritage, and craftsmanship.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

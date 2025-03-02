import React, { useState, useEffect } from "react";
import { LoadingOutlined, HeartFilled, DeleteOutlined } from "@ant-design/icons";
import { Spin, Empty, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../../components/customer/Header";
import Footer from "../../shared/components/layout/Footer";

interface WishlistProperty {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  rooms: number;
  bathrooms: number;
  size: number;
}

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [wishlistItems, setWishlistItems] = useState<WishlistProperty[]>([]);

  // Simulating fetching wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockWishlist: WishlistProperty[] = [
          {
            id: "prop1",
            title: "Modern Apartment in Downtown",
            location: "New York, NY",
            price: 2500,
            imageUrl: "https://example.com/image1.jpg", 
            rooms: 2,
            bathrooms: 1,
            size: 850
          },
          {
            id: "prop2",
            title: "Luxury Condo with Ocean View",
            location: "Miami, FL",
            price: 3200,
            imageUrl: "https://example.com/image2.jpg", 
            rooms: 3,
            bathrooms: 2,
            size: 1200
          },
          {
            id: "prop3",
            title: "Cozy Studio in City Center",
            location: "Chicago, IL",
            price: 1800,
            imageUrl: "https://example.com/image3.jpg", 
            rooms: 1,
            bathrooms: 1,
            size: 550
          }
        ];
        
        setWishlistItems(mockWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        message.error("Failed to load wishlist items");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleViewProperty = (id: string) => {
    navigate(`/customer/property-details/${id}`);
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    message.success("Property removed from wishlist");
  };

  const customIcon = <LoadingOutlined style={{ fontSize: 30, color: "#7e22ce" }} spin />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex-1 pt-24 pb-2 px-4 md:px-8 lg:px-16">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <HeartFilled className="mr-2 text-purple-700" /> My Wishlist
          </h1>
          <p className="text-gray-600">Properties you've saved for later</p>
        </div>

        <Spin spinning={loading} tip="Loading..." indicator={customIcon} className="text-purple-700">
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((property) => (
                <div 
                  key={property.id} 
                  className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div 
                    className="h-48 bg-gray-200 relative cursor-pointer"
                    style={{
                      backgroundImage: `url(/api/placeholder/400/300)`, 
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    onClick={() => handleViewProperty(property.id)}
                  >
                    <div className="absolute top-2 right-2">
                      <Popconfirm
                        title="Remove from wishlist"
                        description="Are you sure you want to remove this property?"
                        onConfirm={() => handleRemoveFromWishlist(property.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ style: { backgroundColor: '#7e22ce' } }}
                      >
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                          <DeleteOutlined className="text-red-500" />
                        </button>
                      </Popconfirm>
                    </div>
                  </div>
                  <div className="p-4" onClick={() => handleViewProperty(property.id)}>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{property.title}</h3>
                    <p className="text-gray-600 mb-2">{property.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-purple-700">${property.price}/mo</span>
                      <div className="text-sm text-gray-500">
                        {property.rooms} bd | {property.bathrooms} ba | {property.size} sqft
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Empty
                description="Your wishlist is empty"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
              <button 
                className="mt-4 px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
                onClick={() => navigate('/customer/home')}
              >
                Browse Properties
              </button>
            </div>
          )}
        </Spin>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";import { useNavigate } from "react-router-dom";
import Header from "../../components/customer/Header";
import PropertyCard from "../../components/customer/home/PropertyCard";
import Footer from "../../shared/components/layout/Footer";
import SearchBar from "../../components/customer/home/SearchBar";
import FilterButton from "../../components/buttons/FilterButton";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleView = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/customer/property-details/${id}`);
      setLoading(false);
    }, 500); 
  };

  const customIcon = <LoadingOutlined style={{ fontSize: 30, color: "#7e22ce" }} spin />;

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 pt-24 pb-2">
        <div className="flex items-center justify-center gap-4 py-4">
          <SearchBar />
          <FilterButton />
        </div>
        <Spin spinning={loading} tip="Loading..." indicator={customIcon} className="text-purple-700">
          <PropertyCard onPropertyClick={handleView} />
        </Spin>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

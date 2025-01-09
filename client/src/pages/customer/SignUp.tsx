import React from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import ImageSection from "../../components/common/ImageSection";
import signupImage from "../../assets/customer-images/signup-image.jpg";
import SignUpFormSection from "../../components/customer/SignUpForm";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 pt-24 pb-1 pl-1">
        <div className="flex flex-col sm:flex-row h-full sm:h-screen">
          <div className="flex-1 flex justify-center items-center">
            <ImageSection
              backgroundImage={signupImage}
              text="Join us today and explore the beauty of Kerala’s countryside!"
              isFullWidth={true}
              textAlignment="center"
            />
          </div>

          <div className="flex-1 flex justify-center items-center bg-white">
            <SignUpFormSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;

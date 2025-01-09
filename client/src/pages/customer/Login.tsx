import React from "react";
import Header from "../../shared/components/layout/Header";
import loginImage from "../../assets/customer-images/login-img.png";
import loginCircle from "../../assets/customer-images/login-circle-bg.png";
import Footer from "../../shared/components/layout/Footer";
import ImageSection from "../../components/common/ImageSection";
import LoginForm from "../../components/customer/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 pt-24 pb-2">
        <div className="flex flex-col h-screen bg-white">
          <div className="flex flex-1">
            <div className="flex-1 flex justify-center items-center">
              <LoginForm />
            </div>

            <div className="flex-1 flex justify-center items-center">
              <ImageSection
                backgroundImage={loginCircle}
                foregroundImage={loginImage}
                text={
                  <>
                    Start your journey by one click, explore <br />
                    beautiful Kerala <br />
                    countryside!
                  </>
                }
                textPosition="-mt-64 ml-6"
              />
            </div>
          </div>
        </div>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;

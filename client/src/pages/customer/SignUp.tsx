import React from 'react';
import Header from '../../shared/components/layout/Header';
import SignUpView from '../../components/customer/signup/SignUpView';
import Footer from '../../shared/components/layout/Footer';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 pt-24 pb-1 pl-1">
        <SignUpView />
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPage;

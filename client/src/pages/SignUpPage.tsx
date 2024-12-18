import React from 'react';
import Header from '../shared/components/Header';
import SignUpView from '../components/signup/SignUpView';
import Footer from '../shared/components/Footer';

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

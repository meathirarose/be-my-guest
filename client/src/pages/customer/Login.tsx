import React from 'react';
import Header from '../../shared/components/layout/Header';
import LoginView from '../../components/customer/login/LoginView';
import Footer from '../../shared/components/layout/Footer';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex-1 pt-24 pb-2">
        <LoginView />
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage

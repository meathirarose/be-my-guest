import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/customer/Header";
import Footer from "../../shared/components/layout/Footer";
import Sidebar from "../../components/common/SideBar";
import { updateProfile } from "../../api/userAuthApi";
import { updateUser } from "../../redux/user/userSlice";
import { Tabs, message } from "antd";
import { Pencil } from "lucide-react";
import InputField from "../../shared/components/ui/InputField";
import { uploadMediaToCloudinary } from "../../api/cloudinaryApi";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.user;
  const dispatch = useDispatch();

  // Profile Info State
  const [editedName, setEditedName] = useState(userInfo?.name || "");
  const [editedEmail, setEditedEmail] = useState(userInfo?.email || "");
  const [editedCountry, setEditedCountry] = useState(userInfo?.country || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    userInfo?.profileImage || ""
  );
  const [isUploading, setIsUploading] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Address State
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", street: "", city: "", state: "", country: "", zipCode: "" }
  ]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleUpdateProfile = async () => {
    try {
      setIsUploading(true);
      let imageurl = userInfo?.profileImage || "";

      if (selectedFile) {
        const uploadedUrl = await uploadMediaToCloudinary(
          selectedFile,
          "be-my-guest/profile-images"
        );
        if (uploadedUrl) imageurl = uploadedUrl;
      }

      await updateProfile(editedName, editedEmail, editedCountry, imageurl);
      dispatch(
        updateUser({
          name: editedName,
          country: editedCountry,
          profileImage: imageurl,
        })
      );
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    try {
      // Add your password change API call here
      message.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      message.error("Failed to update password");
    }
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        id: addresses.length + 1,
        type: "Home",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
      }
    ]);
  };

  const handleUpdateAddress = (id: number, field: string, value: string) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, [field]: value } : addr
    ));
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const ProfileInfoContent = () => (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col items-start mb-6">
        <div className="relative mb-4">
          <img
            src={previewImage || ""}
            alt={`${userInfo?.name || "User"} profile`}
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-600 shadow-md cursor-pointer"
            onClick={handleProfileImageClick}
          />
          <button
            className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 shadow-md hover:bg-purple-700 transition-colors"
            onClick={handleProfileImageClick}
          >
            <Pencil size={18} />
          </button>
        </div>
        <InputField
          type="file"
          name=""
          placeholder=""
          value=""
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          hidden={true}
        />
      </div>

      <div className="space-y-4 w-full">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">Full Name</label>
          <InputField
            type="text"
            name="name"
            placeholder="Full Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">Email Address</label>
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            disabled={true}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">Country</label>
          <InputField
            type="text"
            name="country"
            placeholder="Country"
            value={editedCountry}
            onChange={(e) => setEditedCountry(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleUpdateProfile}
          className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Save Changes"}
        </button>
      </div>
    </div>
  );

  const PasswordChangeContent = () => (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-4 w-full">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">Current Password</label>
          <InputField
            type="password"
            name="currentPassword"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">New Password</label>
          <InputField
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600 font-medium">Confirm Password</label>
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePasswordChange}
          className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors"
        >
          Update Password
        </button>
      </div>
    </div>
  );

  const AddressesContent = () => (
    <div className="space-y-6 max-w-3xl">
      {addresses.map((address, index) => (
        <div key={address.id} className="border p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">Address {index + 1}</h4>
            {addresses.length > 1 && (
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-600">Street Address</label>
              <InputField
                type="text"
                name="street"
                placeholder="Street address"
                value={address.street}
                onChange={(e) => handleUpdateAddress(address.id, 'street', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-600">City</label>
                <InputField
                  type="text"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => handleUpdateAddress(address.id, 'city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600">State</label>
                <InputField
                  type="text"
                  name="state"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => handleUpdateAddress(address.id, 'state', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600">ZIP Code</label>
                <InputField
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={address.zipCode}
                  onChange={(e) => handleUpdateAddress(address.id, 'zipCode', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-600">Country</label>
                <InputField
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) => handleUpdateAddress(address.id, 'country', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddAddress}
        className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors"
      >
        Add New Address
      </button>
    </div>
  );

  const items = [
    {
      key: '1',
      label: 'Profile Info',
      children: <ProfileInfoContent />,
    },
    {
      key: '2',
      label: 'Change Password',
      children: <PasswordChangeContent />,
    },
    {
      key: '3',
      label: 'Addresses',
      children: <AddressesContent />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1 pt-24 pb-4">
        <Sidebar />

        <main className="flex-1 bg-white p-8 rounded-lg shadow-md">
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-800">Your Profile</h3>
          </div>

          <Tabs
            defaultActiveKey="1"
            items={items}
            className="w-full"
          />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
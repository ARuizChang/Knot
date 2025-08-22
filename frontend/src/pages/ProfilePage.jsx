import { useAuthStore } from '../store/useAuthStore.js';
import { useState } from 'react';

const ProfilePage = () => {
  const { user, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      console.log("Uploading image:", base64Image);
      await updateProfile({ profilePicture: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-12 text-[var(--color-text)]">
      <div className="w-full max-w-md bg-[var(--color-card)] rounded-lg shadow p-8 border border-[var(--color-border)]">
        <h2 className="text-2xl font-bold text-center mb-2">Profile</h2>
        <p className="text-center text-[var(--color-text)] mb-6">Your profile information</p>

        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={selectedImg || user?.profilePicture || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 border-[var(--color-accent)] bg-[var(--color-secondary)]"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 
                bg-[var(--color-accent)] hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
                border-2 border-[var(--color-text)] shadow-lg
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
              title="Update photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>

              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={user?.fullName || ''}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] focus:outline-none"
            />
          </div>
        </form>

        <div className="mt-8 border border-[var(--color-border)] rounded-lg p-4">
          <h3 className="text-lg font-semibold">Account Information</h3>
          <div className="flex justify-between py-1">
            <span>Member Since</span>
            <span>{user.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Account Status</span>
            <span className={'font-semibold text-green-500'}>
              active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
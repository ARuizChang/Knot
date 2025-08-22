import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="
        h-full w-20 lg:w-72 flex flex-col transition-all duration-200 
        border-r border-[var(--color-border)] bg-[var(--color-bg)]
      "
    >
      {/* Header */}
      <div className="border-b border-[var(--color-border)] w-full p-4">
        <div className="flex items-center gap-2 text-[var(--color-text)]">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 
                 9.337 9.337 0 0 0 4.121-.952 
                 4.125 4.125 0 0 0-7.533-2.493M15 
                 19.128v-.003c0-1.113-.285-2.16-.786-3.07
                 M15 19.128v.106A12.318 12.318 0 0 1 
                 8.624 21c-2.331 0-4.512-.645-6.374-1.766
                 l-.001-.109a6.375 6.375 0 0 1 11.964-3.07
                 M12 6.375a3.375 3.375 0 1 1-6.75 0 
                 3.375 3.375 0 0 1 6.75 0Zm8.25 
                 2.25a2.625 2.625 0 1 1-5.25 0 
                 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-4 text-[var(--color-text)]">
          <label className="relative inline-flex items-center cursor-pointer">

            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors duration-300
        ${showOnlineOnly ? "bg-[var(--color-accent)]" : "bg-zinc-400/50"}`}
            ></div>
            <div
              className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
        ${showOnlineOnly ? "translate-x-5" : "translate-x-0"}`}
            ></div>
            <span className="ml-3 text-sm select-none">Show online only</span>
          </label>
          <span className="text-xs opacity-70">
            ({onlineUsers.length - 1} online)
          </span>
        </div>

      </div>

      <div className="overflow-y-auto flex-1 py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 rounded-lg transition-colors
              hover:bg-[var(--color-secondary)]
              ${selectedUser?._id === user._id
                ? "bg-[var(--color-card)] ring-1 ring-[var(--color-border)]"
                : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 object-cover rounded-full border border-[var(--color-border)]"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[var(--color-accent)] rounded-full ring-2 ring-[var(--color-bg)]" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0 text-[var(--color-text)]">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm opacity-70">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-[var(--color-text)] opacity-60 py-6">
            No users found
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;

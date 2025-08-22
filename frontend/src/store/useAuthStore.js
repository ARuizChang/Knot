import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { use } from 'react';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');

            set({
                user: response.data,
            });
            get().connectSocket();
        } catch (error) {
            console.error('Error checking authentication:', error);
            set({
                user: null,
            });
        } finally {
            set({
                isCheckingAuth: false,
            });
        }
    },

    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', formData);
            console.log('Signup response:', response);
            set({ user: response.data });
            toast.success('Sign up successful!');
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Please try again.');
        } finally {
            set({ isSigningUp: false });
        }
    },


    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', formData);
            console.log('Login response:', response);
            set({ user: response.data });
            toast.success('Login successful!');
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Please try again.');
        } finally {
            set({ isLoggingIn: false });
        }
    },


    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ user: null });
            toast.success('Logged out successfully!');
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed. Please try again.');
        }
    },

    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put('/auth/update-profile', formData);
            console.log('Profile update response:', response);
            set({ user: response.data });
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Profile update failed. Please try again.');
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket: () => {
        const { user } = get();
        if (!user || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: user._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));


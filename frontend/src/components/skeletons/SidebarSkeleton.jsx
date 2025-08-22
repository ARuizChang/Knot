const SidebarSkeleton = () => {
    const skeletonContacts = Array(6).fill(null);

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-[var(--color-border)]-300 flex flex-col transition-all duration-200">
            <div className="border-b border-[var(--color-border)]-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>

                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-12 rounded-full" />
                        </div>

                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2" />
                            <div className="skeleton h-3 w-16" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarSkeleton;
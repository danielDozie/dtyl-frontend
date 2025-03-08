export interface iNavItems {
    name: string;
    id: number;
    href: string;
};

export const navItems: iNavItems[] = [
    { name: 'About', id: 1, href: '/about' },
    { name: 'Services', id: 2, href: '/services' },
    { name: 'Projects', id: 3, href: '/projects' },
    { name: 'Research', id: 4, href: '/research' },
    { name: 'Clients', id: 5, href: '/clients' },
    { name: 'Blog', id: 6, href: '/blog' },
]



/**
 * projects array contains project data.
 * @type {Array<{size: 'normal' | 'large' | 'small'; isLeft: boolean; imageUrl: string; isStat?: boolean}>}
 */
export const projectsList = [
    { size: 'large' as const, isLeft: true, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', isStat: false },
    { size: 'normal' as const, isLeft: true, imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', isStat: true },
    { size: 'large' as const, isLeft: false, imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80' },
    { size: 'normal' as const, isLeft: false, imageUrl: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', isStat: false },
    { size: 'large' as const, isLeft: true, imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', isStat: false },
    { size: 'normal' as const, isLeft: false, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', isStat: true }
];

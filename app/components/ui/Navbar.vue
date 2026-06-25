<template>
    <header class="navbar-dark bg-dark-blue border-bottom border-secondary">
        <nav class="navbar navbar-expand-lg container-fluid px-3 px-lg-4" aria-label="Main navigation">
            <div class="container-fluid">
                <!-- Logo -->
                <NuxtLink to="/" class="navbar-brand d-flex align-items-center gap-2" aria-label="PrintFlow 3D - Home">
                    <div class="logo-cube bg-primary" style="width: 32px; height: 32px; transform: rotate(45deg);"
                        aria-hidden="true"></div>
                    <span class="fs-5 fw-bold text-white">PrintFlow 3D</span>
                </NuxtLink>

                <!-- Mobile Toggle Button -->
                <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon custom-toggler"></span>
                </button>

                <!-- Navigation Menu -->
                <div class="collapse navbar-collapse" id="mainNavbar">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item">
                            <NuxtLink to="/coming-soon" class="nav-link text-secondary-light" activeClass="text-white"
                                aria-label="Browse 3D models marketplace">
                                Marketplace
                            </NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink to="/services" class="nav-link text-secondary-light" activeClass="text-white"
                                aria-label="Our 3D printing services">
                                Services
                            </NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink to="/materials" class="nav-link text-secondary-light" activeClass="text-white"
                                aria-label="Available printing materials">
                                Materials
                            </NuxtLink>
                        </li>
                        <li class="nav-item" v-if="isAuthenticated">
                            <NuxtLink to="/prints" class="nav-link text-secondary-light" activeClass="text-white"
                                aria-label="View your print orders">
                                My Prints
                            </NuxtLink>
                        </li>
                    </ul>

                    <!-- Search and Profile Section -->
                    <div class="d-flex align-items-center gap-3">
                        <!-- Search Form -->
                        <form class="d-none d-md-block position-relative" role="search" @submit.prevent="handleSearch">
                            <label for="searchInput" class="visually-hidden">Search 3D models</label>
                            <input id="searchInput" v-model="searchQuery"
                                class="form-control form-control-sm border-0 ps-5" type="search"
                                placeholder="Search models..." aria-label="Search 3D models"
                                style="width: 250px; padding: 0.5rem 1rem 0.5rem 2.5rem;" />
                            <svg class="position-absolute text-secondary"
                                style="left: 12px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; pointer-events: none;"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </form>
                        <div class="d-flex" v-if="isAuthenticated">
                            <!-- Profile Button -->
                            <NuxtLink to="/profile" class="btn btn-primary btn-sm fw-semibold"
                                aria-label="Go to profile page">
                                Profile
                            </NuxtLink>

                            <!-- User Avatar -->
                            <NuxtLink to="/profile" class="d-block" aria-label="View user profile">
                                <div class="rounded-circle bg-gradient"
                                    style="width: 40px; height: 40px; background: linear-gradient(135deg, #fb923c 0%, #ec4899 100%);"
                                    role="img" aria-label="User avatar"></div>
                            </NuxtLink>
                        </div>
                        <div v-else>
                            <!-- Login Button -->
                            <NuxtLink to="/login" class="btn btn-outline-light btn-sm fw-semibold"
                                aria-label="Log in to your account">
                                Log In
                            </NuxtLink>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
const searchQuery = ref<string>('')
const store = useUserStore()

const isAuthenticated = computed(() => {
    return store.isAuthenticated
})
const handleSearch = (): void => {
    if (searchQuery.value.trim()) {
        // Navigate to search results
        navigateTo({
            path: '/search',
            query: { q: searchQuery.value }
        })
    }
}

interface OrganizationSchema {
    '@context': string
    '@type': string
    name: string
    url: string
    logo: string
    description: string
}

const organizationSchema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PrintFlow 3D',
    url: 'https://printflow3d.com',
    logo: 'https://printflow3d.com/logo.png',
    description: 'Precision industrial-grade 3D printing services'
}

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(organizationSchema)
        }
    ]
})
</script>

<style scoped>
.custom-toggler .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(232,204,222, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.custom-toggler.navbar-toggler {
    border-color: rgb(232, 204, 222);
}

/* Custom Dark Theme Colors */
.bg-dark-blue {
    background-color: #0d1b2e;
}

.bg-dark-lighter {
    background-color: #1a2942;
}

.text-secondary-light {
    color: #9ca3af;
    transition: color 0.2s ease;
}

.text-secondary-light:hover {
    color: #ffffff;
}

.nav-link.text-white {
    color: #ffffff !important;
}

.border-secondary {
    border-color: #374151 !important;
}

/* Logo Animation */
.logo-cube {
    border-radius: 4px;
    transition: transform 0.3s ease;
}

.navbar-brand:hover .logo-cube {
    transform: rotate(45deg) scale(1.1);
}

/* Search Input Focus */
.form-control:focus {
    background-color: #1a2942;
    color: #ffffff;
    box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
}

/* Profile Avatar Hover */
.bg-gradient {
    transition: transform 0.2s ease;
}

.bg-gradient:hover {
    transform: scale(1.05);
}

/* Navbar Toggler Custom Color */
.navbar-toggler {
    border-color: rgba(255, 255, 255, 0.1);
}

.navbar-toggler:focus {
    box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
}
</style>

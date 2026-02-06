<template>
    <footer class="footer bg-dark-deep border-top border-secondary">
        <div class="container py-4">
            <div class="row align-items-center">
                <!-- Left: Logo & Copyright -->
                <div class="col-md-6 mb-3 mb-md-0">
                    <div class="d-flex align-items-center gap-3">
                        <!-- Logo -->
                        <div class="logo-cube bg-primary" style="width: 24px; height: 24px; transform: rotate(45deg);"
                            aria-hidden="true"></div>

                        <!-- Copyright Text -->
                        <p class="mb-0 text-secondary-light small">
                            © {{ currentYear }} PrintFlow 3D Industrial Systems. All rights reserved.
                        </p>
                    </div>
                </div>

                <!-- Right: Navigation Links -->
                <nav class="col-md-6" aria-label="Footer navigation">
                    <ul class="nav justify-content-md-end gap-4 mb-0">
                        <li class="nav-item">
                            <NuxtLink to="/api-documentation" class="nav-link text-secondary-light p-0"
                                aria-label="View API documentation">
                                API Documentation
                            </NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink to="/privacy" class="nav-link text-secondary-light p-0"
                                aria-label="Read privacy policy">
                                Privacy
                            </NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink to="/terms" class="nav-link text-secondary-light p-0"
                                aria-label="Read terms of service">
                                Terms of Service
                            </NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink to="/enterprise" class="nav-link text-secondary-light p-0"
                                aria-label="Learn about enterprise solutions">
                                Enterprise
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
    margin-top: auto;
    /* Push footer to bottom */
}

.bg-dark-deep {
    background-color: #0a1117;
}

.border-secondary {
    border-color: #1f2937 !important;
}

.text-secondary-light {
    color: #9ca3af;
    transition: color 0.2s ease;
}

.text-secondary-light:hover {
    color: #ffffff;
    text-decoration: none;
}

.logo-cube {
    border-radius: 3px;
    flex-shrink: 0;
}

/* Responsive spacing */
@media (max-width: 768px) {
    .nav {
        flex-direction: column;
        gap: 0.75rem !important;
    }

    .nav-item {
        text-align: center;
    }
}
</style>

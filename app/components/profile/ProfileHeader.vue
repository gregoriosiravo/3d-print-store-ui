<template>
    <div class="row my-3 header-profile" role="region" aria-labelledby="customer-information">
        <div class="col-md-3 text-center m-auto">
            <img class="profile-image" src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                :alt="profilePictureAlt">
        </div>
        <div id="customer-info" class="col-md-4 text-start my-1">
            <div class="row">
                <h1 class="h3">{{ user.firstName }} {{ user.lastName }}</h1>
            </div>
            <div class="row">
                <p class="visually-hidden">User ID</p>
                <span class="text-small">@{{ user.username }} - {{ user.createdAt.toLocaleDateString() }}</span>
            </div>
            <div class="row" role="list" aria-label="User statistics">
                <div class="col-4" role="listitem">
                    <span class="text-xs">Total Prints</span>
                    <p>30</p>
                </div>
                <div class="col-4" role="listitem">
                    <span class="text-xs">STL Assets</span>
                    <p>10</p>
                </div>
                <div class="col-4" role="listitem">
                    <span class="text-xs">Credits</span>
                    <p>200</p>
                </div>
            </div>
        </div>
        <div id="button-header" class="col-md-5 m-auto text-end">
            <button class="btn btn-primary " aria-label="Edit profile">Edit Profile</button>
            <button class="btn btn-light ms-2" aria-label="Share profile"><i class="bi bi-share"></i></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'
const profilePictureAlt = ref("Profile picture of USERNAME")

interface Props {
    user: User
}

const props = defineProps<Props>()

</script>

<style scoped>
.profile-image {
    max-width: 120px;
    border-radius: 50%;
}

.text-xs {
    font-size: x-small;
    color: #6f7f94;
}

.m-auto {
    margin: auto;

}

.text-small {
    font-size: small;
}

.header-profile {
    border: 2px solid #0f2036;
    border-radius: 10px;
    background-color: #101926;
}

@media (max-width: 750px) {
    #button-header {
        text-align: center !important;
        margin-bottom: 10px !important;

    }

    #customer-info {
        text-align: center !important;
    }

    .profile-image {
        margin-top: 10px;
        margin-bottom: 10px;
    }
}
</style>
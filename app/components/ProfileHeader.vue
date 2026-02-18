<template>
    <div class="row my-3 header-profile">
        <div class="col-md-3 text-center m-auto">
            <img class="profile-image" src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                alt="profile image">
        </div>
        <div class="col-md-4 text-start my-1">
            <div class="row">
                <h2>NOME Utente</h2>
            </div>
            <div class="row">
                <p>@id_utente - created_at</p>
            </div>
            <div class="row">
                <div class="col-4">
                    <span class="text-xs">Total Prints</span>
                    <p>30</p>
                </div>
                <div class="col-4">
                    <span class="text-xs">STL Assets</span>
                    <p>10</p>
                </div>
                <div class="col-4">
                    <span class="text-xs">Credits</span>
                    <p>200</p>
                </div>
            </div>
        </div>
        <div class="col-md-5 m-auto text-end">
            <button class="btn btn-primary ">Edit Profile</button>
            <button class="btn btn-light ms-2"><i class="bi bi-share"></i></button>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

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

.header-profile {
    border: 2px solid #0f2036;
    border-radius: 10px;
    background-color: #101926;
}
</style>
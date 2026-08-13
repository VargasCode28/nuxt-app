
<template>
    <div>

        <navbar />

    







    <main>   <!--Aqui es donde Nuxt inyectara el contenido de tus paginas -->
    
        <slot /> 
    </main>




    <LoginModal />
    </div>
</template>



<script setup lang='ts'>



import navbar from '~/components/navbar.vue';
import LoginModal from '~/pages/auth/LoginModal.vue';
</script>
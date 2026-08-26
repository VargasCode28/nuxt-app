
<template>
    <div>

        <navbar />

    <main>   <!--Aqui es donde Nuxt inyectara el contenido de tus paginas -->
        <slot /> 
    </main>






    <LoginModal />
    <registermodal />
    <carritomodal/>
    </div>
</template>








<script setup lang='ts'>

import carritomodal from '~/components/carritomodal.vue';
import navbar from '~/components/navbar.vue';
import LoginModal from '~/pages/auth/loginmodal.vue';
import Registermodal from '~/pages/auth/registermodal.vue';

</script>
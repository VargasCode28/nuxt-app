<script setup lang="ts">
// Panel principal del administrador

definePageMeta({
    layout: 'admin'
})
</script>

<template>
<div class="admin-dashboard">
        <span class="dashboard-eyebrow">Centro de control</span>
        <h1>Panel de Administración</h1>
        <p class="dashboard-copy">Gestiona el catálogo botánico de Clary desde un espacio claro y ordenado.</p>

        <div class="dashboard-grid">
            <NuxtLink to="/admin/productos" class="dashboard-card">
                <span class="dashboard-card-icon">✦</span>
                <span>
                    <strong>Gestionar plantas</strong>
                    <small>Crear, editar y organizar productos</small>
                </span>
                <span class="dashboard-arrow">→</span>
            </NuxtLink>
        </div>
</div>
</template>

<style scoped>
.admin-dashboard {
    max-width: 820px;
}

.dashboard-eyebrow {
    color: #245b45;
    font-size: 0.7rem;
    font-weight: 750;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.admin-dashboard h1 {
    margin: 0.75rem 0 0.55rem;
    color: #18231d;
    font-family: Georgia, serif;
    font-size: clamp(2rem, 5vw, 3.3rem);
    font-weight: 500;
    letter-spacing: -0.025em;
}

.dashboard-copy {
    max-width: 560px;
    margin: 0;
    color: #66736b;
    font-size: 0.98rem;
    line-height: 1.7;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: minmax(260px, 380px);
    gap: 1rem;
    margin-top: 2.5rem;
}

.dashboard-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.85rem;
    padding: 1.1rem;
    border: 1px solid #dfe7e1;
    border-radius: 8px;
    background: #ffffff;
    color: #18231d;
    text-decoration: none;
    box-shadow: 0 6px 18px rgba(24, 35, 29, 0.04);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.dashboard-card:hover {
    border-color: #9bb7a4;
    box-shadow: 0 12px 24px rgba(24, 35, 29, 0.09);
    transform: translateY(-2px);
}

.dashboard-card-icon {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 7px;
    background: #edf5f0;
    color: #245b45;
}

.dashboard-card strong,
.dashboard-card small {
    display: block;
}

.dashboard-card strong { font-size: 0.9rem; }
.dashboard-card small { margin-top: 0.2rem; color: #6a776e; font-size: 0.75rem; }
.dashboard-arrow { color: #245b45; font-size: 1.2rem; }
</style>
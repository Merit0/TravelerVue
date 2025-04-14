import {defineConfig} from 'vite';
import * as path from "node:path";
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()], // Додайте, якщо це Vue-проєкт
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Псевдонім для src/
        },
    },
    server: {
        port: 3000, // Порт для dev-сервера
    },
});
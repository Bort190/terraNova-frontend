import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from '@tailwindcss/vite'
import {tanstackRouter} from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: '127.0.0.1',
        port: 5173
    },
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react(),
        tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    }
})

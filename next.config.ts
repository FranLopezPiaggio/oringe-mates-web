import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Si quieres permitir cualquier dominio HTTPS (útil para desarrollo/prototipos):
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
  /* config options here */
},
};

export default nextConfig;

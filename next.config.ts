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
  /* config options here */
},
};

export default nextConfig;

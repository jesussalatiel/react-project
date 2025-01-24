const nextConfig = {
    output: 'export', // Exporta la aplicación como archivos estáticos
    distDir: 'build', // Especifica la carpeta de salida como 'build'
    trailingSlash: true, // Opcional: Añade una barra final a las URLs
    images: {
      unoptimized: true, // Desactiva la optimización de imágenes si es necesario
    },
    typescript: {
      ignoreBuildErrors: false, // Cambia a true si quieres ignorar errores de TypeScript durante el build
    },
  };
  
  module.exports = nextConfig;
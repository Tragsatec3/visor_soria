const { createProxyMiddleware } = require('http-proxy-middleware');

// Configuramos el middleware en Node.js
const proxy = createProxyMiddleware({
    target: 'http://mi-servidor-wms.com', // Cambia esta URL a tu servidor WMS
    changeOrigin: true,
    pathRewrite: {
        '^/api/proxy': '', // Elimina el prefijo /api/proxy en la redirección
    },
    onProxyRes(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Permite CORS
    },
});

export default function handler(req, res) {
    // Ejecutamos el middleware
    return proxy(req, res, () => {
        res.status(500).send("Error en el proxy");
    });
}

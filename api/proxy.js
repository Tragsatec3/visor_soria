import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
  const proxy = createProxyMiddleware({
    target: 'http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx',
    changeOrigin: true,
    pathRewrite: { '^/api/proxy': '' }, // Elimina '/api/proxy' del inicio de la ruta
    onProxyRes(proxyRes) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Permite CORS
    },
  });

  proxy(req, res, (err) => {
    if (err) {
      console.error('Error en el proxy:', err);
      res.status(500).send("Error en el proxy: " + err.message);
    }
  });
}

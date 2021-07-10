#!/usr/bin/env node

require('esbuild').serve({ servedir: 'public', }, {
    entryPoints: ['src/index.tsx', 'src/styles/base.css'],
    bundle: true,
    minify: false,
    outdir: 'public/static',
    sourcemap: false,
    target: 'es6',
}).then(server => {
    console.log({ server });
    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        server.stop()
    });
});

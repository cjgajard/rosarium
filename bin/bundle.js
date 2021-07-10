#!/usr/bin/env node

require('esbuild').buildSync({
    entryPoints: ['src/index.tsx', 'src/styles/base.css'],
    bundle: true,
    minify: true,
    outdir: 'public/static',
    sourcemap: false,
    target: 'es6',
});

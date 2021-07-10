BUNDLE_DIR=dist

mkdir -p ${BUNDLE_DIR}
cp -r static/* ${BUNDLE_DIR}

node <<-END
require('esbuild').buildSync({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: 'es6',
    outfile: '${BUNDLE_DIR}/index.js',
})
END

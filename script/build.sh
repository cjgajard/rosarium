set -e
pnpx tsc -p lib/gen-lang/
./script/gen-lang.sh
pnpm run build
mv public/index.html .

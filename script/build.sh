set -e
pnpx tsc -p lib/gen-lang/
./script/gen-lang.sh
pnpx tsc
pnpm run build

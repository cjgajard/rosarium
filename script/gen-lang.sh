#!/usr/bin/env bash

gen_lang() {
  for arg in $*; do
    if node dist/lib/gen-lang/ $arg >text/$arg.json; then
      echo text/$arg.json written
    fi
  done
}

pnpx tsc -p lib/gen-lang/ || return 1
if [[ $# -eq 0 ]]; then
  gen_lang $(basename -as .md text/*.md)
else
  gen_lang $@
fi

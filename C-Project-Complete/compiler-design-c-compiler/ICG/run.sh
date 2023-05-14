# #!/bin/bash

function run() {
	cd ./compiler-design-c-compiler/ICG
	flex scanner.l && yacc -d parser.y && gcc y.tab.c lex.yy.c -w
	local filename="testfiles/code.c"
	./a.out $filename
}

run

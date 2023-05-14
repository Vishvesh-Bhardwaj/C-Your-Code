#!/bin/bash

# function run() {
# 	flex scanner1.l && gcc lex.yy.c
# 	local total_testcases="$1"
# 	echo "Running: $total_testcases"
# 	local start=1
# 	while [ $start -le $total_testcases ]
# 	do
# 		printf "\n\n"
# 		echo Running TestCase $start
# 		local filename="tests/test"$start".c"
# 		./a.out $filename
# 		((start++))
# 	done
# }

# number_of_files=`ls -l ./tests/ | egrep -c '^-'`
# run $number_of_files

# function run() {
# 	cd ./compiler-design-c-compiler/Lexical-Analyzer
# 	flex scanner.l && gcc lex.yy.c
# 	local filename="testfiles/code.c"
# 	./a.out $filename
# }

# run

function run() {
	cd ./compiler-design-c-compiler/Lexical-Analyzer
	python lexical.py
}
run

import re
from collections import OrderedDict

# Token types
TOKEN_TYPES = OrderedDict([
    ('KEYWORD', r'(auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)'),
    ('IDENTIFIER', r'[a-zA-Z_][a-zA-Z0-9_]*'),
    ('CONSTANT', r'(0x[0-9A-Fa-f]+|\d+\.\d*|\.\d+|\d+)'),
    ('STRING_LITERAL', r'\".*?\"'),
    ('OPERATOR', r'(\+\+|--|->|==|!=|<=|>=|\+=|-=|\*=|/=|%=|<<|>>|<<=|>>=|&=|\^=|\|=)'),
    ('PUNCTUATOR', r'([(){}\[\];,])'),
    ('COMMENT', r'(/\*.*?\*/|//.*)'),
])

# Function to tokenize C code
def tokenize_c_code(code):
    tokens = []
    for token_type, pattern in TOKEN_TYPES.items():
        for match in re.findall(pattern, code):
            tokens.append((token_type, match))
    return tokens

# Function to check if input is valid
def is_valid_input(code):
    pattern = '|'.join('(?:{})'.format(pattern)
                      for pattern in TOKEN_TYPES.values())
    return re.match('^{}+$'.format(pattern), code)

# Function to analyze C code and generate symbol tree
def analyze_c_code(file_path):
    try:
        with open(file_path, 'r') as file:
            code = file.read()

            # Check if input is valid
            if not is_valid_input(code):
                print('Lexical error: Invalid input.')
                return

            tokens = tokenize_c_code(code)

            # Generate symbol tree in tabular format
            symbol_tree = []
            for token in tokens:
                symbol_tree.append([token[0], token[1]])

            print('{:<15}{}'.format('Token', 'Lexeme'))
            print('-'*30)
            for symbol in symbol_tree:
                print('{:<15}{}'.format(symbol[0], symbol[1]))
    except re.error:
        print('Lexical error: Invalid regular expression pattern.')
    except Exception as e:
        print('Error:', str(e))


# Analyze C code in file
file_path = 'testfiles/code.c'
analyze_c_code(file_path)

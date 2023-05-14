import re

def generate_three_address_code(code):
    # Split code into individual statements
    statements = re.split(';|\n', code)
    
    # Remove any empty statements
    statements = [s.strip() for s in statements if s.strip()]
    
    # Initialize temporary variable counter
    temp_counter = 1
    
    # Initialize list to hold three address code
    tac = []
    
    # Loop through each statement and generate three address code
    for statement in statements:
        # Split statement into individual expressions
        expressions = re.findall('[a-zA-Z0-9]+|[-+*/()]', statement)

        
        # Initialize variables to hold current expression and temporary variables
        current_expression = ''
        current_temp = ''
        
        # Loop through each expression and generate three address code
        for expression in expressions:
            # If expression is an operator, append it to current expression
            if expression in '+-*/':
                current_expression += expression
            
            # If expression is a variable, use it as an operand in the current expression
            elif re.match('[a-zA-Z][a-zA-Z0-9]*', expression):
                if not current_temp:
                    current_temp = 't{}'.format(temp_counter)
                    temp_counter += 1
                    tac.append('{} = {}'.format(current_temp, expression))
                else:
                    current_expression += current_temp
                    current_temp = ''
                    current_expression += expression
            
            # If expression is a number, use it as an operand in the current expression
            elif re.match('[0-9]+', expression):
                if not current_temp:
                    current_temp = 't{}'.format(temp_counter)
                    temp_counter += 1
                    tac.append('{} = {}'.format(current_temp, expression))
                else:
                    current_expression += current_temp
                    current_temp = ''
                    current_expression += expression
            
            # If expression is a left parenthesis, append it to the current expression
            elif expression == '(':
                current_expression += expression
            
            # If expression is a right parenthesis, use the current temporary variable as the operand
            elif expression == ')':
                current_expression += current_temp
                current_temp = ''
                tac.append('{} = {}'.format(current_temp, current_expression))
                current_expression = ''
        
        # If there is a leftover temporary variable, use it as the result of the statement
        if current_temp:
            tac.append('{} = {}'.format(current_temp, current_expression))
        
    # Output three address code
    for code_line in tac:
        print(code_line)

file_path = 'testfiles/code.c'
with open(file_path, 'r') as file:
            code = file.read()


# code = '''
# x = 3
# y = 2
# if (x > y) {
#     print("x is greater than y")
# } else {
#     print("x is not greater than y")
# }
# '''

generate_three_address_code(code)

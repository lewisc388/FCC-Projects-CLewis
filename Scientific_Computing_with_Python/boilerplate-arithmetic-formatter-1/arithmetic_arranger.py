def calculate(num1, operator, num2, space):
  if operator == "+":
    res = str(num1 + num2)
  elif operator == "-":
    res = str(num1 - num2)

  return ((' ' * (space - len(res))) + res + "    ")

def arithmetic_arranger(problems, answering=False):

  #Error detection
  if len(problems) > 5:
    return "Error: Too many problems."

  #Declare strings to hold output
  topOp = ''
  bottomOp = ''
  dash = ''
  answer = ''

  for i in problems:
    equation = i.split()
    spacer = "    "

    #Error Detection
    if equation[1] != "+" and equation[1] != "-":
      return "Error: Operator must be '+' or '-'."

    if len(equation[0]) > 4 or len(equation[2]) > 4:
      return "Error: Numbers cannot be more than four digits."

    if equation[0].isnumeric() == False or equation[2].isnumeric() == False:
      return "Error: Numbers must only contain digits."

    toplen = len(equation[0])
    bottomlen = len(equation[2])
    

    #If the top operator is longer than the bottom,
    #generate padding to ensure right align
    if toplen > bottomlen:
      padding = ' ' * (toplen - bottomlen)
      space = toplen + 2

      topOp += ('  ' + equation[0] + spacer)
      bottomOp += (equation[1] + ' ' + padding + equation[2] + spacer)
      dash += (('-' * space) + spacer)

      if answering == True:
        answer += calculate(int(equation[0]), equation[1], int(equation[2]), space)
          

    #If the bottom operator is longer than the top,
    #generate padding to ensure right align
    elif bottomlen > toplen:
      padding = ' ' * (bottomlen - toplen)
      space = bottomlen + 2

      topOp += ('  ' + padding + equation[0] + spacer)
      bottomOp += (equation[1] + ' ' + equation[2] + spacer)
      dash += (('-' * (bottomlen + 2)) + spacer)

      if answering == True:
        answer += calculate(int(equation[0]), equation[1], int(equation[2]), space)

    else:
      space = toplen + 2

      topOp += ('  ' + equation[0] + spacer)
      bottomOp += (equation[1] + ' ' + equation[2] + spacer)
      dash += (('-' * (toplen + 2)) + spacer)

      if answering == True:
        answer += calculate(int(equation[0]), equation[1], int(equation[2]), space)

  topOp = topOp[:-4] + "\n"
  bottomOp = bottomOp[:-4] + "\n"

  if answer != '':
    dash = dash[:-4] + "\n"
    answer = answer[:-4]
  else:
    dash = dash[:-4]

  arranged_problems = topOp + bottomOp + dash + answer

  return arranged_problems
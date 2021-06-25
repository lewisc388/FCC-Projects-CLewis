import math

class Category:
  def __init__(self, category):
    self.ledger = []
    self.category = category
    self.balance = 0.0

  def deposit(self, amount, description = ""):
    self.ledger.append({"amount": amount, "description": description})
    self.balance += amount
  
  def withdraw(self, amount, description = ""):
    if (self.check_funds(amount) == True):
      self.ledger.append({"amount": -amount, "description": description})
      self.balance -= amount
      return True

    else:
      return False
  
  # Returns the current balance of the budget
  def get_balance(self):
    return self.balance

  def transfer(self, amount, category):
    if (self.check_funds(amount) == True):
      self.balance -= amount

      self.ledger.append({"amount": -amount,"description":"Transfer to " + category.category})
      category.ledger.append({"amount": amount,"description": "Transfer from " + self.category})
      return True

    else:
     return False

  def check_funds(self, amount):
    if (amount > self.balance):
      return False
    elif (amount <= self.balance):
      return True

  def __repr__(self):
    # returns budget output in a formatted display
    reciept = ""
    reciept += self.category.center(30, "*") + "\n"

    for transaction in self.ledger:
      amnt = 0
      desc = ""

      for key, value in transaction.items():
        if (key == "amount"):
          amnt = value
        elif (key == "description"):
          desc = value
      
      if (len(desc) > 23):
        desc = desc[:23]
      
      amnt = str(format(float(amnt), '.2f'))
      if (len(amnt) > 7):
        amnt = amnt[:7]

      reciept += desc + str(amnt).rjust(30 - len(desc)) + "\n"
    
    reciept += 'Total: ' + str(format(self.balance, '.2f'))

    return(reciept)


def create_spend_chart(categories):
  category_names = []
  spent = []
  spent_percentages = []

  for cat in categories:
    total = 0
    for item in cat.ledger:
      if (item['amount'] < 0):
        total -= item['amount']
    spent.append(round(total, 2))
    category_names.append(cat.category)

  for amount in spent:
    spent_percentages.append(round(amount / sum(spent), 2)*100)

  graph = "Percentage spent by category\n"

  labels = range(100, -10, -10)

  for label in labels:
    graph += str(label).rjust(3) + "| "
    for percent in spent_percentages:
      if (percent >= label):
        graph += "o  "
      else:
        graph += "   "
    graph += "\n"

  graph += "    ----" + ("---" * (len(category_names) - 1))
  graph += "\n     "

  longest_name_length = 0

  for name in category_names:
    if (longest_name_length < len(name)):
      longest_name_length = len(name)

  for i in range(longest_name_length):
    for name in category_names:
      if (len(name) > i):
        graph += name[i] + "  "
      else:
        graph += "   "
    if (i < (longest_name_length - 1)):
      graph += "\n     "

  return(graph)
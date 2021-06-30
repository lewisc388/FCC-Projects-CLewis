import copy
import random
# Consider using the modules imported above.

class Hat:
  def __init__(self, **kwargs):
    #print("[*]Args:" + str(kwargs))
    self.contents = convert(kwargs) 
    #print("[*]Contents:" + str(self.contents))
  
  def draw(self, todraw):
    draw_list = []
    contents = self.contents

    if (len(contents) <= todraw):
      return contents
    else:
      for i in range(todraw):
        choice = random.choice(contents)
        contents.remove(choice)
        draw_list.append(choice)
      self.contents = contents
      return draw_list


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
  probs = 0
  expected = convert(expected_balls)

  for i in range(num_experiments):
    drawhat = copy.deepcopy(hat)
    pulled = drawhat.draw(num_balls_drawn)
    if (check_if_equal(expected, pulled)):
      probs += 1
  
  return probs/num_experiments


def convert(args):
  formatted = []
  for key, value in args.items():
    for i in range(value):
      formatted.append(key)
  return formatted

def check_if_equal(list_1, list_2):
  for item in list_1:
    if (item not in list_2):
      return False
    else:
      list_2.remove(item)
  
  return True
import math

class Rectangle:
  def __init__(self, width, height):
    self.width = width
    self.height = height
  
  def set_width(self, width):
    self.width = width
  
  def set_height(self, height):
    self.height = height
  
  def get_area(self):
    return (self.width * self.height)
  
  def get_perimeter(self):
    return ((2 * self.width) + (2 * self.height))
  
  def get_diagonal(self):
    return ((self.width ** 2 + self.height ** 2) ** .5)
  
  def get_picture(self):
    if (self.width > 50) or (self.height > 50):
      return("Too big for picture.")
    else:
      photo = ""
      photo += (("*" * self.width) + "\n") * self.height 
      return (photo)

  def get_amount_inside(self, shape):
    height_A = self.height
    width_A = self.width

    height_B = shape.height
    width_B = shape.width

    fit_height = 0
    fit_width = 0

    fit_height = math.floor(height_A / height_B)
    fit_width = math.floor(width_A / width_B)

    if (fit_height < 1) or (fit_width < 1):
      return (0)
    else:
      return (fit_height * fit_width)

  def __str__(self):
    return f"Rectangle(width={self.width}, height={self.height})"



class Square(Rectangle):
  def __init__(self, side):
    super().__init__(side, side)

  def set_side(self, side):
    super().set_height(side)
    super().set_width(side)
  
  def set_width(self, side):
    super().set_height(side)
    super().set_width(side)

  def set_height(self, side):
    super().set_height(side)
    super().set_width(side)
  
  def __str__(self):
    return f"Square(side={self.width})"

  
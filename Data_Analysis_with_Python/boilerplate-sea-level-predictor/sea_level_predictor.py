import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress
import numpy as np

def draw_plot():
  # Read data from file
  df = pd.read_csv('epa-sea-level.csv')


  # Create scatter plot
  plt.scatter(df['Year'], df['CSIRO Adjusted Sea Level'], c = "red", s = 3.0)


  # Create first line of best fit
  # https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.linregress.html
  slope, intercept, r_value, p_value, stderr = linregress(df['Year'], df['CSIRO Adjusted Sea Level'])
  x1 = np.arange(df['Year'].min(), 2051, 1)
  plt.plot(x1, x1 * slope + intercept, color="green")

  
  # Create second line of best fit
  df_future = df[df['Year'] >= 2000]

  slope, intercept, r_value, p_value, stderr = linregress(df_future["Year"], df_future["CSIRO Adjusted Sea Level"])
  x2 = np.arange(2000, 2051, 1)
  plt.plot(x2, x2 * slope + intercept, color="blue", linestyle='dashed')


  # Add labels and title
  plt.title('Rise in Sea Level')
  plt.xlabel('Year')
  plt.ylabel('Sea Level (inches)')


  #------------------------------------------------------------------------------------
  # Save plot and return data for testing (DO NOT MODIFY)

  plt.savefig('sea_level_plot.png')
  return plt.gca()
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = pd.read_csv("fcc-forum-pageviews.csv")
df = df.set_index('date')

# Clean data
df = df[
  (df['value'] >= (df['value'].quantile(0.025))) & 
  (df['value'] <= (df['value'].quantile(0.975)))   
]

df.index = pd.to_datetime(df.index)


def draw_line_plot():
  # Draw line plot
  fig, ax = plt.subplots(figsize = (20,10))

  ax.plot(df.index, df['value'], color='blue', linewidth=1)
  ax.set_title("Daily freeCodeCamp Forum Page Views 5/2016-12/2019")
  ax.set_xlabel("Date")
  ax.set_ylabel("Page Views")

  # Save image and return fig (don't change this part)
  fig.savefig('line_plot.png')
  return fig

def draw_bar_plot():
  # Copy and modify data for monthly bar plot
  df_bar = df.copy()

  df['year'] = df.index.year
  df['month'] = df.index.month

  df_bar = df.groupby(['year', 'month'])['value'].mean()
  df_bar = df_bar.unstack()

  # Draw bar plot
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  fig = df_bar.plot(kind = "bar", legend = True, figsize = (15,10)).figure
  plt.xlabel("Years", fontsize = 12)
  plt.ylabel("Average Page Views", fontsize = 12)
  plt.xticks(fontsize = 12)
  plt.yticks(fontsize = 12)
  plt.legend(title = 'Months', fontsize = 12, labels = months)

  # Save image and return fig (don't change this part)
  fig.savefig('bar_plot.png')
  return fig

def draw_box_plot():
  # Prepare data for box plots (this part is done!)
  df_box = df.copy()
  df_box.reset_index(inplace=True)
  df_box['year'] = [d.year for d in df_box.date]
  df_box['month'] = [d.strftime('%b') for d in df_box.date]

  # Draw box plots (using Seaborn)
  submonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  fig = plt.figure(figsize = (20, 5))

  ax1 = plt.subplot(1, 2, 1)
  sns.boxplot(y = df_box['value'], x = df_box['year'])

  ax1.set_ylabel('Page Views')
  ax1.set_xlabel('Year')
  ax1.set_title('Year-wise Box Plot (Trend)')


  ax2 = plt.subplot(1, 2, 2)
  sns.boxplot(y = df_box['value'], x = df_box['month'], order = submonths)

  ax2.set_ylabel('Page Views')
  ax2.set_xlabel('Month')
  ax2.set_title('Month-wise Box Plot (Seasonality)')


  # Save image and return fig (don't change this part)
  fig.savefig('box_plot.png')
  return fig

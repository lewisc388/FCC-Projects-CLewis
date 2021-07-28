import numpy as np

def calculate(list):
  if (len(list) != 9):
    raise ValueError("List must contain nine numbers.")
  else:
    nplist = np.array([list[0:3], list[3:6], list[6:9]])

    calculations = {
      'mean': [],
      'variance': [],
      'standard deviation': [],
      'max': [],
      'min': [],
      'sum': []
    }

    flat_mean = nplist.mean()
    flat_var = nplist.var()
    flat_std = nplist.std()
    flat_max = nplist.max()
    flat_min = nplist.min()
    flat_sum = nplist.sum()

    axis1_mean = nplist.mean(0)
    axis1_var = nplist.var(0)
    axis1_std = nplist.std(0)
    axis1_max = nplist.max(0)
    axis1_min = nplist.min(0)
    axis1_sum = nplist.sum(0)

    axis2_mean = nplist.mean(1)
    axis2_var = nplist.var(1)
    axis2_std = nplist.std(1)
    axis2_max = nplist.max(1)
    axis2_min = nplist.min(1)
    axis2_sum = nplist.sum(1)

    calculations['mean'] = [axis1_mean.tolist(), axis2_mean.tolist(), flat_mean]
    calculations['variance'] = [axis1_var.tolist(), axis2_var.tolist(), flat_var]
    calculations['standard deviation'] = [axis1_std.tolist(), axis2_std.tolist(), flat_std]
    calculations['max'] = [axis1_max.tolist(), axis2_max.tolist(), flat_max]
    calculations['min'] = [axis1_min.tolist(), axis2_min.tolist(), flat_min]
    calculations['sum'] = [axis1_sum.tolist(), axis2_sum.tolist(), flat_sum]


    return calculations
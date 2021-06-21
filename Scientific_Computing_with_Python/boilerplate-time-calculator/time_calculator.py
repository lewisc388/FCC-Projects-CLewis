def time_24h(Time12h):
  newTime = Time12h.replace(':', ' ')
  newTime = newTime.split(' ')
  
  hour = int(newTime[0])
  minute = int(newTime[1])
  #print(f"[*]newTime {newTime}")

  if len(newTime) > 2:
    if newTime[2] == "PM":
      hour += 12

  #print(f"[*]{hour}:{minute}")

  return hour, minute

def time_12h(hour, minute):
  ampm = ''
  
  if hour == 12:
    ampm = 'PM'
  elif hour == 0:
    ampm = "AM"
    hour = 12
  elif hour > 12:
    ampm = "PM"
    hour -= 12
  elif hour < 12:
    ampm = "AM"
  
  if minute < 10:
    return f"{hour}:0{minute} {ampm}"
  else:
    return f"{hour}:{minute} {ampm}"

def dhs(hour, minute):
  days = 0
  
  while minute >= 60:
    hour += 1
    minute -= 60

  while hour >= 24:
    days += 1
    hour -= 24

  return days, hour, minute
  

def add_time(start, duration, startdate=''):
  #print(f"\n[*] Start:{start} Duration:{duration} Startdate:{startdate}")
  new_time = ''
  dayofweek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  # Convert times to a 24-hour format
  starthour, startminute = time_24h(start)
  addhour, addminute = time_24h(duration)

  # Add start and duration tinmes together to get elapsed
  # days, hours, and minutes
  nh = starthour + addhour
  nm = startminute + addminute

  elapsedDays, elapsedHours, elapsedMinutes = dhs(nh, nm)

  #print(f"Elapsed time{elapsedDays}:{elapsedHours}:{elapsedMinutes}")

  # Add the time in 12-hour format to the new_time string
  new_time += time_12h(elapsedHours, elapsedMinutes)


  # If starting day of week is specified
  if startdate != '':
    # Check what day of week selected
    for index, d in enumerate(dayofweek):
      if d.lower() == startdate.lower():
        dayindex = index  

    # When no days have passed. Just print the startdate
    if elapsedDays == 0:
      new_time += f", {dayofweek[dayindex]}"
    # When only one day has passed, print next day of week
    # and add "(next day)"
    elif elapsedDays == 1:
      i = dayindex + 1
      i %= 7

      new_time += f", {dayofweek[i]} (next day)"
    # When more than one day has passed, print new date of
    # week and the elapsed days
    else:
      i = dayindex + elapsedDays
      i %= 7

      new_time += f", {dayofweek[i]} ({elapsedDays} days later)" 

  else:
    # When only one day has passed, add "(next day)"
    if elapsedDays == 1:
      new_time += f" (next day)"
    # When more than one day has passed, display the 
    # elapsed days
    elif elapsedDays > 1:
      new_time += f" ({elapsedDays} days later)"

  #print(f"[*] Result: {new_time}")
  return new_time



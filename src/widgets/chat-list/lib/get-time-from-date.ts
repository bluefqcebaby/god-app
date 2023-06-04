export const getTimeFromDate = (date: Date) => {
  const mins = date.getMinutes()
  const hours = date.getHours()

  return `${hours >= 10 ? hours : '0' + hours}:${
    mins >= 10 ? mins : '0' + mins
  }`
}

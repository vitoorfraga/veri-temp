// 👉🏻 Converte um número para Celsius.

export const FormatToCelsius = (temp: number) => {
  const formattedTempToCelcius = temp.toLocaleString('pt-br', {
    style: 'unit',
    unit: 'celsius',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return formattedTempToCelcius
}

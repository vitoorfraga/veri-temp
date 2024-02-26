// 👉🏻 Converte um número para Celsius.

export const FormatToCelsius = (temp: number | null | undefined) => {
  // 👉🏻 Verifica se a temperatura existe.
  const tempExists = !!temp
  if (!tempExists) return '-'

  const formattedTempToCelcius = temp!.toLocaleString('pt-br', {
    unit: 'celsius',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  // 👉🏻 Retorna a temperatura formatada.
  return `${formattedTempToCelcius}°C`
}

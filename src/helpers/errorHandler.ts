// 👉🏻 Função responsável por tratar os erros da aplicação.

export const errorHandler = (error: number): string => {
  const errorMap: Record<string, string> = {
    404: 'Localidade não encontrada. Por favor, verifique o nome preenchido e tente novamente.',
  }

  // 👉🏻 Verifica se o erro já mapeamento para o erro.
  const errorMessage = errorMap[error]

  // 👉🏻 Retorna mensagem de erro especifica, caso exista.
  if (errorMessage) {
    return errorMessage
  }

  // 👉🏻 Retorna mensagem genérica de erro.
  return 'Erro ao buscar a previsão do tempo. Tente novamente.'
}

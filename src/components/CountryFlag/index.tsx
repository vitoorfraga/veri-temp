interface CountryFlagProps {
  countryNameInitial: string
  width?: number
  height?: number
}

export const CountryFlag = ({
  countryNameInitial,
  width = 26,
  height = 12,
}: CountryFlagProps) => {
  return (
    <img
      src={`https://flagcdn.com/${countryNameInitial?.toLowerCase()}.svg`}
      width={width}
      height={height}
      alt={`Bandeira do país ${countryNameInitial}`}
    />
  )
}

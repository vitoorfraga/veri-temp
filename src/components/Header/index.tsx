import { Button } from '../Button'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SelectField } from '../SelectField'
import { SelectItem } from '../SelectItem'

export const Header = () => {
  return (
    <header className="h-16 border-b border-zinc-200 px-14 flex items-center justify-between">
      <div className="flex items-center gap-11">
        <h1 className="text-sky-800 text-xl font-bold">VeriTemp</h1>
        <Button>
          Procure por uma cidade...
          <Search className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-5">
        <Link to="/history" className="text-sky-800 font-medium">
          Histórico
        </Link>

        <SelectField>
          <SelectItem value="open-meteor">Open Meteor</SelectItem>
          <SelectItem value="open-weather">Open Weather</SelectItem>
        </SelectField>
      </div>
    </header>
  )
}

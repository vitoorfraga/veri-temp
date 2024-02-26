import { Button } from '../Button'
import { TextField } from '../TextField'
import { Modal } from '../Modal'

import { ChangeEvent, useState } from 'react'

import { SearchCityList } from './SearchCityList'
import { SearchIcon } from 'lucide-react'

export const SearchCityModal = () => {
  const [searchParam, setSearchParam] = useState<string>('')
  const [modalVisibility, setModalVisibility] = useState(false)

  // 👉🏻 Controla o input de busca.
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchParam(value)
  }

  // 👉🏻 Realiza Toggle na visibilidade da modal.
  const toggleModalVisibility = () => {
    setModalVisibility(!modalVisibility)
  }

  return (
    <Modal.Root open={modalVisibility} onOpenChange={toggleModalVisibility}>
      <Modal.Trigger asChild>
        <Button onClick={toggleModalVisibility}>
          Procure por uma cidade...
          <SearchIcon className="size-4" />
        </Button>
      </Modal.Trigger>

      <Modal.Content>
        <TextField
          placeholder="Procure por uma cidade..."
          icon={<SearchIcon className="size-5" />}
          value={searchParam}
          onChange={handleSearchInputChange}
        />

        <SearchCityList
          searchParam={searchParam}
          toggleModalVisibility={toggleModalVisibility}
        />
      </Modal.Content>
    </Modal.Root>
  )
}

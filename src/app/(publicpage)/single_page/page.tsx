import SearchBar from '@/app/components/filter/SearchBar'
import SinglePage from '@/app/components/single_page/single_view'
import Filters from '@/app/components/filter/Filters'
import React from 'react'

const Single = () => {
  return (
    <main>
      <SearchBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-80 flex-shrink-0">
            <Filters />
          </aside>
          <div className="flex-1">
            <SinglePage />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Single
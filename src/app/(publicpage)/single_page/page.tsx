import SearchBar from '@/app/components/filter/SearchBar'
import SinglePage from '@/app/components/single_page/single_view'

import React from 'react'

const Single = () => {
  return (
    <main>
      <SearchBar />
      <div className="container mx-auto px-4 py-6">
      
          
          <div className="flex-1">
            <SinglePage />
          </div>
       
      </div>
    </main>
  )
}

export default Single
import HotelList from '@/app/components/filter/HotelList'
import SearchBar from '@/app/components/filter/SearchBar'
import React from 'react'


const Filter = () => {
  return (
    <main>
     
      <SearchBar />
      <HotelList />
    </main>
  )
}

export default Filter
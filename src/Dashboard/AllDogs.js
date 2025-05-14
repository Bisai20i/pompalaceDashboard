import React, { useState, useEffect } from 'react'
import DogCard from '../elements/DogCard'
import DogDetail from './DogDetail'
import spinner from '../elements/spinner.gif'
import FilterBox from '../elements/FilterBox'

export default function AllDogs(props) {
  let [loading, setLoading] = useState(false)
  let [dogdetail, setDogdetail] = useState({
    name: 'Dog Name',
    address: 'Dog Address',
    owner: 'Mr. Gaule',
    contact: '+977 9800000000',
    description: 'This is dog description.',
    price: 40000,
    status: true,
    profile: '#',
    cover: '#'
  })
  let [dogs, setDogs] = useState([])
  let [filterDogs, setFilterDogs] = useState([])
  let [filterDate, setFilterDate] = useState()
  let [filterPrice, setFilterPrice] = useState()
  let [query, setQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {

      try {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}alldogs`);
        const data = await response.json();
        // console.log(data);
        setDogs(data.data)
        setLoading(false)

      } catch (error) {
        console.error("Error:", error);
      }
    };


    fetchData();
    // setLoading(false)
  }, []);

  useEffect(() => {

    let filtered = [...dogs];

    if (query) {
      filtered = filtered.filter(dog =>
        dog.name.toLowerCase().includes(query.toLowerCase()) ||
        dog.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filterPrice === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filterPrice === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // 🔵 Sort by date
    if (filterDate === 'new') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filterDate === 'old') {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    setFilterDogs(filtered);
  }, [query, filterDate, filterPrice, dogs]);


  const openModal = (dog) => {
    setDogdetail({
      name: dog.name,
      address: dog.address,
      owner: dog.owner,
      contact: dog.contact,
      description: dog.description,
      price: dog.price,
      status: dog.status,
      profile: dog.profile,
      cover: dog.cover,
      id: dog.id,
      buyername: props.user.name,
      buyercontact: props.user.contact
    })
    const yOffset = document.getElementById('container').scrollTop
    // document.getElementById('container').scrollTo({ top: 30, behavior: 'smooth' });
    document.getElementById('DetailModal').style.top = (yOffset + 20) + 'px'
    document.getElementById('DetailModal').classList.remove('hidden')
  }
  return (
    <>
      <DogDetail dog={dogdetail}></DogDetail>
      <h1 className='p-2'><strong className='text-lg md:text-xl font-bold flex items-center'><i class='bx bxs-dog me-2' ></i>All Dogs:</strong></h1>
      <hr className='border-1 border-purple-500 mb-2' />
      <FilterBox setFilterDate={setFilterDate} setQuery={setQuery} setFilterPrice={setFilterPrice}></FilterBox>
      {loading && <div className='w-full flex justify-center my-1'><img src={spinner} className='h-24' alt='loading' /></div>}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 p-1 md:p2' id='alldogscontainer'>
        {
          filterDogs.map((dog, index) => (
            <DogCard
              key={index}
              image={dog.profile_img}
              coverimg={dog.cover_img}
              name={dog.name}
              price={dog.price}
              description={dog.description}
              address={dog.address}
              status={dog.available}
              owner="POM PALACE"
              contact="+977 980000000"
              dog_id={dog.id}
              onClick={openModal}
              setDogdetail={setDogdetail}
            />
          ))
        }


        {/* <DogCard image="https://th.bing.com/th/id/R.a36b8bbb35be8e73027668134048e0b5?rik=jCUDrZiW3ByLgg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-4.jpg&ehk=o%2fP1MsjWaVwQnI9FzPfUPMhaFKsbQLuMvfG4k1Bsolw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." address="Pokhara-9" status={true} owner="Mr. Gaule" contact="+977 980000000" onClick={openModal} setDogdetail={setDogdetail}></DogCard>

        <DogCard image="https://th.bing.com/th/id/R.3467e922c1366b0cc74ffd6a68fb2943?rik=U7%2bqc%2fhj%2bkeRPw&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-6.jpg&ehk=EljARVX3yqi3BC2LxT%2fMn275YeL7PcGUYO774fGSedw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." address="Pokhara-9" status="Available" onClick={openModal}></DogCard> */}

      </div>

    </>
  )
}

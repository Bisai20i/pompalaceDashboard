import React, {useState} from 'react'
import DogCard from '../elements/DogCard'
import DogDetail from './DogDetail' 

export default function AllDogs() {
  let [dogdetail, setDogdetail] = useState({
    name:'Dog Name',
    address: 'Dog Address',
    owner: 'Mr. Gaule',
    contact: '+977 9800000000',
    description: 'This is dog description.',
    price: 40000,
    status: true,
    profile: '#'
  })

  const openModal = (dog)=>{
    setDogdetail({
      name:dog.name,
      address: dog.address,
      owner: dog.owner,
      contact: dog.contact,
      description: dog.description,
      price: dog.price,
      status: dog.status,
      profile: dog.profile
    })
    document.getElementById('container').scrollTo({ top: 30, behavior: 'smooth' });
    document.getElementById('DetailModal').classList.remove('hidden')
  }
  return (
    <>
    <DogDetail dog={dogdetail}></DogDetail>
    <h1 className='p-2'><strong className='text-xl font-bold'>All Dogs:</strong></h1>
    <hr className='border-1 border-purple-500 mb-2' />
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2'>
      <DogCard image="https://th.bing.com/th/id/R.a36b8bbb35be8e73027668134048e0b5?rik=jCUDrZiW3ByLgg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-4.jpg&ehk=o%2fP1MsjWaVwQnI9FzPfUPMhaFKsbQLuMvfG4k1Bsolw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." address="Pokhara-9" status={true} owner="Mr. Gaule" contact="+977 980000000" onClick={openModal} setDogdetail={setDogdetail}></DogCard>

      <DogCard image="https://th.bing.com/th/id/R.a36b8bbb35be8e73027668134048e0b5?rik=jCUDrZiW3ByLgg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-4.jpg&ehk=o%2fP1MsjWaVwQnI9FzPfUPMhaFKsbQLuMvfG4k1Bsolw%3d&risl=&pid=ImgRaw&r=0" name="babal kukur" price="NPR. 30000" description="This is a sample bla bla bla dog description." address="Kathmandu-9" status={false} onClick={openModal} setDogdetail={setDogdetail}></DogCard>

      <DogCard image="https://th.bing.com/th/id/R.a36b8bbb35be8e73027668134048e0b5?rik=jCUDrZiW3ByLgg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-4.jpg&ehk=o%2fP1MsjWaVwQnI9FzPfUPMhaFKsbQLuMvfG4k1Bsolw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." address="Pokhara-9" status="Available" onClick={openModal}></DogCard>

      <DogCard image="https://th.bing.com/th/id/R.3467e922c1366b0cc74ffd6a68fb2943?rik=U7%2bqc%2fhj%2bkeRPw&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-6.jpg&ehk=EljARVX3yqi3BC2LxT%2fMn275YeL7PcGUYO774fGSedw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." address="Pokhara-9" status="Available" onClick={openModal} ></DogCard>

      <DogCard image="https://th.bing.com/th/id/R.3467e922c1366b0cc74ffd6a68fb2943?rik=U7%2bqc%2fhj%2bkeRPw&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-6.jpg&ehk=EljARVX3yqi3BC2LxT%2fMn275YeL7PcGUYO774fGSedw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." address="Pokhara-9" status="Available" onClick={openModal}></DogCard>
    
    </div>

    </>
  )
}

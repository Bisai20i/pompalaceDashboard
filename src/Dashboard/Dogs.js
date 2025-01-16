import React,{useState} from 'react'
import MyDogCard from '../elements/MyDogCard'
import AddDog from './AddDog'
import Delete from '../elements/Delete'

function Dogs() {
  let [editing, setEditing] = useState(false)
  let [deleting, setDeleting] = useState(false)
  let [dog, setDog] = useState({})
  let [modalInfo, setModalInfo] = useState({
    title:'Add a new Dog',
    btn:'Add Dog'
  })
 
  const openEdit = (id) => {
    setDog( {
      name: 'Kukur Vai',
      price: 20000,
      breed: 'big',
      description: 'Kukur vai is very friendly dog from pokhara.'
    })
    document.getElementById('container').scrollTo({ top: 0, behavior: 'smooth' });
    setModalInfo({title:"Edit Dog", btn:'Edit Dog'})
    setEditing(true)
  }
  const toggleAdd = () => {
    setModalInfo({title:"Add a new Dog", btn:'Add Dog'})
    setDog({})

    if(editing){
      setEditing(false)
    }else{
      setEditing(true)
    }
  }
  const openDelete = (id,name) => {
    setDog({name: name})
    setDeleting(true)
  }
  return (
    
    <>
    {deleting && <Delete close={setDeleting} name={dog.name}></Delete>}
    
    {editing && <AddDog toggle={toggleAdd} dog={dog} info={modalInfo}></AddDog>}
    <h1 className='p-2 flex justify-between items-center'>
      <strong className='text-sm md:text-lg lg:text-xl font-bold'>Your all dogs:</strong>
      <button onClick={toggleAdd} className='px-2 py-1 md:px-4 md:py-1.5 border-2 border-green-500 text-green-500 rounded-md md:rounded-lg font-bold text-xs md:text-sm hover:border-green-300 hover:scale-95 transition duration-200 ease-in'>Add Dog | + </button>
    </h1>
    <hr className='border-1 border-purple-500 mb-2' />
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2' id='holder'>
      <MyDogCard image="https://th.bing.com/th/id/R.a36b8bbb35be8e73027668134048e0b5?rik=jCUDrZiW3ByLgg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-4.jpg&ehk=o%2fP1MsjWaVwQnI9FzPfUPMhaFKsbQLuMvfG4k1Bsolw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." id={1} status={true} openEdit={openEdit} openDelete = {openDelete}></MyDogCard>

      <MyDogCard image="https://th.bing.com/th/id/R.a36b8bbb35be8e73027668134048e0b5?rik=jCUDrZiW3ByLgg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-4.jpg&ehk=o%2fP1MsjWaVwQnI9FzPfUPMhaFKsbQLuMvfG4k1Bsolw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." id={1} status={true} openEdit={openEdit} openDelete = {openDelete}></MyDogCard>

      <MyDogCard image="https://th.bing.com/th/id/R.a36b8bbb35be8e73027668134048e0b5?rik=jCUDrZiW3ByLgg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-4.jpg&ehk=o%2fP1MsjWaVwQnI9FzPfUPMhaFKsbQLuMvfG4k1Bsolw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." id={1} status={true} openEdit={openEdit} openDelete = {openDelete}></MyDogCard>

      <MyDogCard image="https://th.bing.com/th/id/R.a36b8bbb35be8e73027668134048e0b5?rik=jCUDrZiW3ByLgg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-4.jpg&ehk=o%2fP1MsjWaVwQnI9FzPfUPMhaFKsbQLuMvfG4k1Bsolw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." id={1} status={true} openEdit={openEdit} openDelete = {openDelete}></MyDogCard>

    </div>
    </>
  )
}

export default Dogs
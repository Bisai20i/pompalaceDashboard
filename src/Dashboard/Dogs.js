import React,{useState, useEffect} from 'react'
import MyDogCard from '../elements/MyDogCard'
import AddDog from './AddDog'
import Delete from '../elements/Delete'
import spinner from '../elements/spinner.gif'

function Dogs() {
  let [editing, setEditing] = useState(false)
  let [dog, setDog] = useState({})
  let [userdogs, setUserdogs] = useState([])
  let [loading, setLoading] = useState(false)
  let [modalInfo, setModalInfo] = useState({
    title:'Add a new Dog',
    btn:'Add Dog'
  })

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:8000/api/dogs`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`
          }
        });
        const data = await response.json();
        // console.log(data);
        setUserdogs(data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
    // setLoading(false)
  }, []);
 
  const openEdit = (dog) => {
    setDog( {
      name: dog.name,
      price: dog.price,
      breed: dog.breed,
      description: dog.description,
      id: dog.id
    })
    document.getElementById('container').scrollTo({ top: 0, behavior: 'smooth' });
    setModalInfo({title:"Edit Dog", btn:'Edit Dog', add:false})
    setEditing(true)
  }
  const toggleAdd = () => {
    setModalInfo({title:"Add a new Dog", btn:'Add Dog', add:true})
    setDog({})

    if(editing){
      setEditing(false)
    }else{
      setEditing(true)
    }
  }
  const openDelete = (id,name) => {
    setDog({name: name, id: id})

    const yOffset = document.getElementById('container').scrollTop
    // document.getElementById('container').scrollTo({ top: 30, behavior: 'smooth' });
    document.getElementById('deleteDogModal').style.top = (yOffset + 20) + 'px'
    document.getElementById('deleteDogModal').classList.remove('hidden')
  }
  return (
    
    <>
    <Delete name={dog.name} id={dog.id}></Delete>
    
    {editing && <AddDog toggle={toggleAdd} dog={dog} info={modalInfo}></AddDog>}
    <h1 className='p-2 flex justify-between items-center'>
      <strong className='text-sm md:text-lg lg:text-xl font-bold flex items-center'><i class='bx bx-spreadsheet me-2' ></i>Your all dogs:</strong>
      <button onClick={toggleAdd} className='pe-2 ps-1 py-1 md:pe-4 md:ps-2 md:py-1.5 border-2 border-green-500 text-green-500 rounded-sm font-bold text-xs md:text-sm hover:border-green-300 hover:text-green-400 transition flex items-center duration-200 ease-in'><i class='bx bx-comment-add mx-2' ></i>Add Dog</button>
    </h1>
    <hr className='border-1 border-purple-500 mb-2' />
    {loading && <div className='w-full flex justify-center my-1'><img src={spinner} className='h-24' alt='loading'/></div> }
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-1 md:p-2' id='holder'>

      {
        
        userdogs.map((dog, index)=>(
          <MyDogCard 
            key={index} 
            image={dog.profile_img} 
            name={dog.name} 
            price={dog.price} 
            description={dog.description} 
            id={dog.id} 
            status={dog.available} 
            openEdit={openEdit} 
            openDelete = {openDelete}
          />
        ))
      }


      {/* <MyDogCard image="https://th.bing.com/th/id/R.a36b8bbb35be8e73027668134048e0b5?rik=jCUDrZiW3ByLgg&riu=http%3a%2f%2fanimalsbreeds.com%2fwp-content%2fuploads%2f2014%2f11%2fPomeranian-4.jpg&ehk=o%2fP1MsjWaVwQnI9FzPfUPMhaFKsbQLuMvfG4k1Bsolw%3d&risl=&pid=ImgRaw&r=0" name="Sample Dog" price="NPR. 20000" description="This is a sample dog description." id={1} status={true} openEdit={openEdit} openDelete = {openDelete}></MyDogCard> */}

    </div>
    </>
  )
}

export default Dogs
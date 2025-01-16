import React,{useState} from 'react'
import Submit from '../form/Submit'


function AddDog(props) {
    const {toggle, dog, info} = props
    let [name, setName] = useState(dog.name)
    let [price, setPrice] = useState(dog.price)
    let [description, setDescription] = useState(dog.description)
    let [profile, setProfile] = useState(null)
    let [cover, setCover] = useState(null)
    let [breed, setBreed] = useState(dog.breed)

    const [previewUrl, setPreviewUrl] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);

    // useEffect(() => {
    //     return () => {
    //     if (previewUrl) {
    //         URL.revokeObjectURL(previewUrl);
    //     }
    //     };
    // }, [previewUrl]);

    // let [doginfo, setDoginfo] = useState({
    //     name: dog.name,
    //     price: dog.price,
    //     description: dog.description,
         
    // })
  return (
    <>
    <div className='absolute bg-white/90 w-full top-0 left-0 p-4'>
        <h1 className='my-2 flex justify-between'>
            <strong className='text-lg md:text-xl font-bold'>{info.title}</strong> 
            <button onClick={toggle} className='px-1.5 md:px-4 py-1 md:py-1.5 border-2 border-red-500 text-red-500 rounded-md font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in'>Close ❌</button>
        </h1>
        <hr className='border-1 border-purple-500 mb-2' />
        <form action="#" className=''>
            <div className='block md:flex gap-4 items-center justify-center'>
                <div className='flex-1'>
                    <label htmlFor="name" className='my-2 text-purple-600'>Name</label>
                    <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md md:text-lg rounded-md focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="text" name="descriptoin" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div >
                <div className='flex-1'>
                    <label htmlFor="price" className='my-2 text-purple-600'>Price</label>
                    <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md md:text-lg rounded-md focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="number" name="price" placeholder="Enter Price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                </div>
            </div>
            <div className='block md:flex gap-4 items-center justify-center'>
                <div className='flex-1'>
                    <label htmlFor="name" className='my-2 text-purple-600'>Breed</label>
                    <select value = {breed} onChange={(e)=>{setBreed(e.target.value)}} className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md md:text-lg rounded-md focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400'>
                        
                        <option value="pomeranian">Pomeranian</option>
                        <option value="small">Small Breed</option>
                        <option value="big">Big Breed</option>
                    </select>
                </div>
                <div className='flex-1'>
                    <label htmlFor="description" className='my-2 text-purple-600'>Description</label>
                    <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md md:text-lg rounded-md focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="text" name="description" placeholder="Enter Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                    
                </div>
            </div>
            <div className='block md:flex gap-4 justify-center'>
                <div className='flex-1'>
                    <label htmlFor="profile" className='my-2 text-purple-600'>Profile Image</label>
                    <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md md:text-lg rounded-md focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="file" name="profile" accept="image/*" onChange={(e)=>{setProfile(e.target.files[0]); setPreviewUrl(URL.createObjectURL(e.target.files[0]))}}/>

                    {previewUrl && <img src={previewUrl} alt="Profile Preview" className='p-2 w-full h-auto' />}
                </div >

                <div className='flex-1'>
                    <label htmlFor="cover" className='my-2 text-purple-600'>Cover Image</label>
                    <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md md:text-lg rounded-md focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="file" name="cover" accept="image/*" onChange={(e)=>{setCover(e.target.files[0]); setCoverUrl(URL.createObjectURL(e.target.files[0]))}} /> 

                    {coverUrl && <img src={coverUrl} alt="Profile Preview" className='p-2 w-full h-auto' />}
                </div>
            </div>
            <Submit name={info.btn}></Submit>
            
            {/* <div>
                <label htmlFor="name">Description</label>
                <Input type="text" name="descriptoin" description="Enter Description"/>
            </div>
            <div>
                <label htmlFor="name">Price</label>
                <Input type="number" name="price" description="Enter Price"/>
            </div>
            <div>
                <label htmlFor="name">Profile Image</label>
                <Input type="text" name="profile" description="Enter Name"/>
            </div> */}
        </form>
    </div>
    </>
  )
}

export default AddDog
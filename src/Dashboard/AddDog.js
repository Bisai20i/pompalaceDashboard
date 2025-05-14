import React, { useState } from 'react'
import Submit from '../form/Submit'
import Alert from '../elements/Alert'
import spinner from '../elements/spinner.gif'


function AddDog(props) {
    const { toggle, dog, info } = props
    let [loading, setLoading] = useState(false)
    let [name, setName] = useState(dog.name)
    let [price, setPrice] = useState(dog.price)
    let [description, setDescription] = useState(dog.description)
    let [breed, setBreed] = useState(dog.breed?dog.breed:'pomeranian')
    let [profile, setProfile] = useState(null)
    let [cover, setCover] = useState(null)
    let [alert, setAlert] = useState({status:false, type:'', message:''})
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
    const submitDog = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('name', name);
        formData.append('breed', breed);
        formData.append('price', price);
        formData.append('description', description);
        if (profile) {
            formData.append('profile', profile);
        }
        if (cover) {
            formData.append('cover', cover);

        }

        try{
            setLoading(true)
            if(info.add){
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}dogs`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`
                    },
                    body: formData
                })
                const data = await response.json()
                setLoading(false)
                // console.log(data)
                if(data.status){
                    setAlert({status:true, type: 'success', message: data.message})
                    setName('')
                    setPrice()
                    setCover(null)
                    setProfile(null)
                    setDescription('')
                    // document.getElementById('alldogscontainer').innerHTML += `
                    //     <DogCard
                    //         image={${URL.createObjectURL(profile)}}
                    //         coverimg={${URL.createObjectURL(cover)}}
                    //         name={${name}}
                    //         price={${price}}
                    //         description={${description}}
                    //         address={Nepal}
                    //         status={${true}}
                    //         owner="POM PALACE"
                    //         contact="+977 980000000"
                    //         onClick={openModal}
                    //         setDogdetail={setDogdetail}
                    //     />
                    // `
                }
                else{
                    setAlert({status:true, type: 'alert', message: data.message})
                }
                document.getElementById('container').scrollTo({top:0, behavior:'smooth'})
            }
            else{
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}dogs/${dog.id}`,{
                    method: 'POST',
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('POM_TOKEN')}`,
                        'X-HTTP-Method-Override': 'PATCH'
                    },
                    body: formData
                })
                const data = await response.json()
                setLoading(false)
                // console.log(data)
                if(data.status){
                    setAlert({status:true, type: 'success', message: data.message})
                    setName('')
                    setPrice()
                    setCover(null)
                    setProfile(null)
                    setDescription('')
                }
                else{
                    setAlert({status:true, type: 'alert', message: data.message})
                }
                document.getElementById('container').scrollTo({top:0, behavior:'smooth'})
            }
            
        }
        catch(error){
            console.error("Error:", error)
        }
            

    }

    return (
        <>
            <div className='absolute bg-white/90 w-full top-0 left-0 p-4'>

                {alert.status && <Alert type={alert.type} message={alert.message} close={()=>{setAlert({status:false})}}/>}
                <h1 className='my-2 flex justify-between items-center'>
                    <strong className='text-lg md:text-xl font-bold'>{info.title}</strong>
                    <button onClick={toggle} className='px-1.5 md:px-4 py-1 md:py-1.5 border-2 border-red-500 text-red-500 rounded-sm font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in'>Close ❌</button>
                </h1>
                <hr className='border-1 border-purple-500 mb-2' />
                <form onSubmit={submitDog} >
                    <div className='block md:flex gap-4 items-center justify-center'>
                        <div className='flex-1'>
                            <label htmlFor="name" className='my-2 text-purple-600'>Name</label>
                            <input className='px-3 py-1 md:px-5 md:py-2 text-md md:text-lg rounded-sm focus:outline-none ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="text" name="descriptoin" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                        </div >
                        <div className='flex-1'>
                            <label htmlFor="price" className='my-2 text-purple-600'>Price</label>
                            <input className='px-3 py-1 md:px-5 md:py-2 text-md md:text-lg rounded-sm focus:outline-none ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="number" name="price" placeholder="Enter Price" value={price} onChange={(e) => { setPrice(e.target.value) }}  required/>
                        </div>
                    </div>
                    <div className='block md:flex gap-4 items-center justify-center'>
                        <div className='flex-1'>
                            <label htmlFor="name" className='my-2 text-purple-600'>Breed</label>
                            <select value={breed} onChange={(e) => { setBreed(e.target.value) }} className='px-3 py-1 md:px-5 md:py-2 text-md md:text-lg rounded-sm focus:outline-none ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400'>

                                <option value="pomeranian">Pomeranian</option>
                                <option value="small">Small Breed</option>
                                <option value="big">Big Breed</option>
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="description" className='my-2 text-purple-600'>Description</label>
                            <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md rounded-sm focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full my-2 shadow-md shadow-purple-400' type="text" name="description" placeholder="Enter Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />

                        </div>
                    </div>
                    <div className='block md:flex gap-4 justify-center'>
                        <div className='flex-1'>
                            <label htmlFor="profile" className='my-2 text-purple-600'>Profile Image</label>
                            <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md rounded-sm focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full my-2 shadow-md shadow-purple-400' type="file" name="profile" accept="image/*" onChange={(e) => {setProfile(e.target.files[0]); setPreviewUrl(URL.createObjectURL(e.target.files[0])) }} />

                            {previewUrl && <img src={previewUrl} alt="Profile Preview" className='p-2 w-full h-auto' />}
                        </div >

                        <div className='flex-1'>
                            <label htmlFor="cover" className='my-2 text-purple-600'>Cover Image</label>
                            <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md rounded-sm focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full my-2 shadow-md shadow-purple-400' type="file" name="cover" accept="image/*" onChange={(e) => {setCover(e.target.files[0]) ;setCoverUrl(URL.createObjectURL(e.target.files[0])) }} />

                            {coverUrl && <img src={coverUrl} alt="Profile Preview" className='p-2 w-full h-auto' />}
                        </div>
                    </div>
                    <Submit name={loading?'Submitting...':info.btn}></Submit>

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
                {loading && <div className='w-full flex justify-center my-1'><img src={spinner} className='h-24' alt='loading'/></div> }

            </div>
        </>
    )
}

export default AddDog
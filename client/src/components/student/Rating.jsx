import React from 'react'


const Rating = ({initialRating,onRate}) => {
  const [rating ,setRating]=useState(initialRating || 0)

  const handleRating = (value)=>{
    setRating=(value)=>{
setRating(value);
if(onRate)onratechange(value)


    }
  }
  useEffect(()=>{
    if(initialRating){
      setRating(initialRating);
    }
  },[initialRating]);
  return (
    <div>
      {Array.from({length: 5},()=>{
    const starValue=index+1;
    return(
      <span key={index} className={`text-xl s,:text-2xl cursor-pointer transition-colors ${starvalue <=rating ?'text-yellow-500':'text-gray-400'

      }`}onClick={()=>handleRating(starValue)}>

      </span>
    )
      })}
    </div>
  )
}

export default Rating

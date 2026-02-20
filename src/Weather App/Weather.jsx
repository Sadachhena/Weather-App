import React, { useState } from "react";
import { WiFog } from "react-icons/wi";

export default function Weather() {
  let [city,setcity]=useState('')
  let [WeatherDetail,setWeatherDetail]=useState()
  let ApiKey="a070d82b0f6c45a7ae2161533262002 "

  let GetData=(event)=>{
    event.preventDefault(); 

    fetch(`https://api.weatherapi.com/v1/current.json?key=${ApiKey }&q=${city}`
)
      .then((response)=>response.json()) 
      .then((Finalresponse)=>{
        if(Finalresponse.error){
        setWeatherDetail(undefined)
        }
        else{
                setWeatherDetail(Finalresponse)

        }
        setcity('')  
      })
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex flex-col items-center py-16 px-4">

      {/* Title */}
      <h1 className="text-5xl font-bold text-white mb-10 tracking-wide">
        Weather App
      </h1>

      {/* Search Form */}
      <form 
      onSubmit={GetData}
      className="flex items-center bg-white/10 backdrop-blur-md rounded-full shadow-lg p-2 mb-12 w-full max-w-md border border-white/20">
        <input
        value={city}
        onChange={(e)=>setcity(e.target.value)}
          type="text"
          placeholder="Search city..."
          className="flex-1 bg-transparent outline-none text-white px-4 placeholder-gray-300"
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white px-6 py-2 rounded-full font-medium shadow-md">
          Search
        </button>
      </form>

      {/* Weather Card */}
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center text-white">

       {
        WeatherDetail!==undefined
        ?
        <>
         <h2 className="text-2xl font-semibold tracking-wide">
          {WeatherDetail.location.name}, <span>IN</span>
        </h2>

       <div className="flex justify-center items-center my-6">
  <img
    src={`https:${WeatherDetail.current.condition.icon}`}
    alt={WeatherDetail.current.condition.text}
    className="w-24 h-24 mx-auto"
  />
</div>
        <h3 className="text-6xl font-bold mb-2">
  {WeatherDetail.current.temp_c}°
</h3>

       <p className="text-lg text-gray-300 tracking-wide">
        {WeatherDetail.current.condition.text}
      </p>
        </>
        :
        "No Data Found"
       }

      </div>
    </section>
  );
}